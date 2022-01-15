import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    OnDestroy
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItem, ChildMenuItem, User, Permission } from '@caballus/ui-common';
import { Observable, of, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { UserState, LogoutAction } from '@caballus/ui-state';

@Component({
    selector: 'caballus-secured-container',
    templateUrl: './secured-container.component.html',
    styleUrls: ['./secured-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecuredContainerComponent implements OnInit, OnDestroy {
    @Select(UserState.user)
    public user$: Observable<User>;

    private _mobileQueryListener: () => void;
    private _subs: Subscription = new Subscription();

    public sidebarExpanded: boolean = true;
    public mobileQuery: MediaQueryList;
    public siteMenu$: Observable<MenuItem[]>;

    constructor(
        private _media: MediaMatcher,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store
    ) {
        this.mobileQuery = this._media.matchMedia('(max-width: 767px)');
        this._mobileQueryListener = (): void => this._changeDetectorRef.detectChanges();
        this.mobileQuery.addEventListener('change', this._mobileQueryListener);
        this._subs.add(
            this._router.events
                .pipe(filter(e => e instanceof NavigationEnd))
                .subscribe((e: NavigationEnd) => this._updateSiteMenu(e.urlAfterRedirects))
        );
    }

    public ngOnInit(): void {}

    public ngOnDestroy(): void {
        this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    }

    public sidebarToggle(snav: MatSidenav, shouldOpen?: boolean): void {
        if (typeof shouldOpen === 'boolean') {
            if (shouldOpen === true) {
                snav.open();
            } else {
                snav.close();
            }
        } else {
            snav.toggle();
        }
    }

    public logout(): void {
        this._store
            .dispatch(new LogoutAction())
            .pipe(take(1))
            .subscribe();
    }

    private _updateSiteMenu(currentUrl: string): void {
        const urlParts = currentUrl.split('/');
        urlParts.shift(); // Remove blank since urls start with '/'
        const primarySlug = urlParts
            .shift()
            .toLowerCase()
            .trim();
        this.siteMenu$ = of([
            new MenuItem({
                label: 'Dashboard',
                icon: ['far', 'drafting-compass'],
                route: '/dashboard'
            }),
            new MenuItem({
                label: 'Reports',
                icon: ['far', 'chart-line'],
                active: primarySlug === 'reports',
                children: [
                    new ChildMenuItem({
                        label: 'Primary Report'
                    })
                ]
            }),
            new MenuItem({
                label: 'Settings',
                icon: ['far', 'hands-helping'],
                active: primarySlug === 'support',
                children: [
                    new ChildMenuItem({
                        label: 'Roles',
                        route: '/support/role/list',
                        permission: Permission.RoleDashboard
                    }),
                    new ChildMenuItem({
                        label: 'Users',
                        route: '/support/user/list',
                        permission: Permission.UserDashboard
                    })
                ]
            }),
            new MenuItem({
                label: 'Profile',
                icon: ['far', 'user'],
                active: primarySlug === 'profile'
            })
        ]);
    }
}
