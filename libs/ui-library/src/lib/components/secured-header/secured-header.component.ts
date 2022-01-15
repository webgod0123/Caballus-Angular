import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { User, AppNotification, UserProfile, ITokenPayload, Permission, Role, UserService, ToastService } from '@caballus/ui-common';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { AuthState, StopUserImpersonationAction } from '@caballus/ui-state';
import { Select, Store } from '@ngxs/store';
import { map, take, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'caballus-secured-header',
    templateUrl: './secured-header.component.html',
    styleUrls: ['./secured-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecuredHeaderComponent implements OnInit {
    @Select(AuthState.tokenPayload)
    public tokenPayload$: Observable<ITokenPayload>;

    @Input()
    public user: User = new User({
        profile: new UserProfile({ firstName: 'Dallas', lastName: 'James' })
    });
    @Input()
    public notifications: AppNotification[] = [];

    @Output()
    public logout: EventEmitter<void> = new EventEmitter<void>();

    public showBanner$: BehaviorSubject<boolean> = new BehaviorSubject(true);

    public impersonating$: Observable<boolean>;
    private _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _router: Router,
        private _store: Store,
        private _userService: UserService,
        private _toastService: ToastService
    ) {}

    public ngOnInit(): void {
        this.impersonating$ = this.tokenPayload$.pipe(
            map(payload => !!payload && payload.userId !== payload.absoluteUserId)
        );
    }

    public ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    public stopImpersonation(): void {
        this._store.dispatch(new StopUserImpersonationAction()).pipe(
            take(1),
            tap(() =>
                this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                    this._router.navigate(['/support/user/list']);
                })
            ),
            catchError(err => {
                console.error(err);
                this._toastService.error(err);
                return of(void 0);
            })
        ).subscribe();
    }
}
