import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { UiLibraryModule } from '@caballus/ui-library';
import { UiCommonModule, Permission } from '@caballus/ui-common';
import { SharedModule } from '@ngx-caballus/shared/shared.module';
import { RoleEditComponent } from './pages/role-edit/role-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RfxFormsModule } from '@rfx/ngx-forms';
import {
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatExpansionModule
} from '@angular/material';
import { PermissionGuard } from '@ngx-caballus/routes/guards';

@NgModule({
    declarations: [RoleListComponent, RoleEditComponent],
    imports: [
        CommonModule,
        UiLibraryModule,
        UiCommonModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        SharedModule,
        ReactiveFormsModule,
        RfxFormsModule,
        RouterModule.forChild([
            {
                path: 'list',
                component: RoleListComponent,
                canActivate: [PermissionGuard],
                data: {
                    permission: Permission.RoleDashboard
                }
            },
            {
                path: 'create',
                component: RoleEditComponent,
                canActivate: [PermissionGuard],
                data: {
                    permission: Permission.RoleCreate
                }
            },
            {
                path: 'edit/:id',
                component: RoleEditComponent,
                canActivate: [PermissionGuard],
                data: {
                    permission: Permission.RoleEdit
                }
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list'
            }
        ])
    ]
})
export class RoleModule {}
