import { Component, OnInit, ChangeDetectionStrategy, TrackByFunction } from '@angular/core';
import { RfxGridDataSource } from '@rfx/ngx-grid';
import { Role, RoleService, ToastService, ModalService } from '@caballus/ui-common';
import { Router, ActivatedRoute } from '@angular/router';
import { IStringFilter, DateFilter, SortDirection, Sort } from '@rfx/common';
import { of } from 'rxjs';
import { take, switchMap, map, tap, catchError } from 'rxjs/operators';

interface RoleFilters {
    searchTerm: IStringFilter;
}

@Component({
    selector: 'caballus-role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleListComponent implements OnInit {
    public gridSource: RfxGridDataSource<Role, RoleFilters>;

    constructor(
        private readonly _roleService: RoleService,
        private readonly _router: Router,
        private readonly _modalService: ModalService,
        private readonly _toastService: ToastService
    ) {}

    public ngOnInit(): void {
        this.gridSource = new RfxGridDataSource<Role, RoleFilters>([], {
            queryFn: [this._roleService, 'getRoleList'],
            sort: new Sort({
                field: 'name',
                sortOrder: SortDirection.Ascending
            })
        });
    }

    public openItem(item: Role): void {
        this._router.navigateByUrl(`/support/role/edit/${item._id}`);
    }

    public deleteItem(item: Role): void {
        this._modalService
            .confirm('Delete Role?', '', 'Yes')
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

    public deleteItems(items: Role[]): void {
        this._roleService
            .deleteRoles(items.map(i => i._id))
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
}
