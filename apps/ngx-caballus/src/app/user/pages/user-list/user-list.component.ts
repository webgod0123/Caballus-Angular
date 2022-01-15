import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService, User, Permission, Role, ToastService, ModalService } from '@caballus/ui-common';
import { RfxGridDataSource } from '@rfx/ngx-grid';
import { Router } from '@angular/router';
import { IStringFilter, SortDirection, Sort } from '@rfx/common';
import { Subject, of } from 'rxjs';
import { take, tap, catchError } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { ImpersonateUserAction } from '@caballus/ui-state';

interface UserFilters {
    searchTerm: IStringFilter;
}

@Component({
    selector: 'caballus-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {
    public gridSource: RfxGridDataSource<User, UserFilters>;

    constructor(
        private readonly _userService: UserService,
        private readonly _router: Router,
        private readonly _toastService: ToastService,
        private readonly _store: Store,
        private readonly _modalService: ModalService
    ) {}

    public ngOnInit(): void {
        this.gridSource = new RfxGridDataSource<User, UserFilters>([], {
            queryFn: [this._userService, 'getUserList'],
            sort: new Sort({
                field: 'profile.firstName',
                sortOrder: SortDirection.Ascending
            })
        });
    }

    public openItem(item: User): void {
        this._router.navigateByUrl(`/support/user/edit/${item._id}`);
    }

    public deleteItem(item: User): void {
        this._modalService
            .confirm('Delete User?', '', 'Yes')
            .afterClosed()
            .pipe(
                take(1),
                tap(confirmed => {
                    if (confirmed) {
                        this.deleteItems([item]);
                    }
                })
            ).subscribe();
    }

    public deleteItems(items: User[]): void {
        this._userService
            .deleteUsers(items.map(i => i._id))
            .pipe(
                tap(() => {
                    this._toastService.success('Deleted');
                    this.gridSource.updateData();
                }),
                catchError(err => {
                    console.error(err);
                    this._toastService.error(err);
                    return of(void 0);
                })
            ).subscribe();
    }

    public impersonate(userId: string, event: Event): void {
        event.stopPropagation();
        this._store.dispatch(new ImpersonateUserAction(userId)).pipe(
            take(1),
            tap(() => this._router.navigateByUrl('/dashboard')),
            catchError(err => {
                console.error(err);
                this._toastService.error(err);
                return of(void 0);
            })
        ).subscribe();
    }
}
