import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UiLibraryModule } from '@caballus/ui-library';
import { UiCommonModule, Permission } from '@caballus/ui-common';
import { SharedModule } from '@ngx-caballus/shared/shared.module';
import { RfxFormsModule } from '@rfx/ngx-forms';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import {
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule
} from '@angular/material';
import { PermissionGuard } from '@ngx-caballus/routes/guards';

@NgModule({
    declarations: [UserListComponent, UserEditComponent],
    imports: [
        CommonModule,
        UiLibraryModule,
        UiCommonModule,
        SharedModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatCardModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        RfxFormsModule,
        RouterModule.forChild([
            {
                path: 'list',
                component: UserListComponent,
                canActivate: [PermissionGuard],
                data: {
                    permission: Permission.UserDashboard
                }
            },
            {
                path: 'create',
                component: UserEditComponent,
                canActivate: [PermissionGuard],
                data: {
                    permission: Permission.UserCreate
                }
            },
            {
                path: 'edit/:id',
                component: UserEditComponent,
                canActivate: [PermissionGuard],
                data: {
                    permission: Permission.UserEdit
                }
            }
        ])
    ]
})
export class UserModule {}
