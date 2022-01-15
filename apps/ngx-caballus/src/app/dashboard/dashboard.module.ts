import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { SharedModule } from '@ngx-caballus/shared/shared.module';
import { UiCommonModule } from '@caballus/ui-common';
import { UiLibraryModule } from '@caballus/ui-library';
import { DashboardRedirectGuard } from '@ngx-caballus/routes/guards';
import {
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
} from '@angular/material';
import { ChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [AdminComponent],
    exports: [],
    imports: [
        CommonModule,
        SharedModule,
        UiCommonModule,
        UiLibraryModule,
        ChartsModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        RouterModule.forChild([
            {
                path: 'admin',
                component: AdminComponent
            },
            {
                path: '',
                pathMatch: 'full',
                canActivate: [DashboardRedirectGuard]
            }
        ])
    ]
})
export class DashboardModule {}
