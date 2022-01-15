import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, PreloadAllModules, Scroll } from '@angular/router';
import { NgModule } from '@angular/core';
import { UiLibraryModule } from '@caballus/ui-library';
import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { UiCommonModule } from '@caballus/ui-common';
import { PublicContainerComponent } from './shared/containers';
import { SecuredContainerComponent } from './shared/containers';
import { AuthGuard } from '@ngx-caballus/routes/guards';
import {
    MatGridListModule,
    MatExpansionModule,
    MatCardModule,
    MatInputModule,
    MatIconModule
} from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { MatButtonToggleModule, MatButtonToggle } from '@angular/material/button-toggle';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ChartsModule,
        MatButtonToggleModule,
        ScrollingModule,
        RouterModule.forRoot(
            [
                {
                    path: '',
                    pathMatch: 'full',
                    redirectTo: 'dashboard/admin'
                },
                {
                    path: '',
                    component: PublicContainerComponent,
                    children: [
                        {
                            path: 'auth',
                            loadChildren: (): any =>
                                import('./auth/auth.module').then(am => am.AuthModule)
                        }
                    ]
                },
                {
                    path: '',
                    component: SecuredContainerComponent,
                    canActivate: [AuthGuard],
                    children: [
                        {
                            path: 'dashboard',
                            loadChildren: (): any =>
                                import('./dashboard/dashboard.module').then(dm => dm.DashboardModule)
                        },
                        {
                            path: 'dashboard/operations',
                            loadChildren: (): any =>
                                import('./dashboard/dashboard.module').then(dm => dm.DashboardModule)
                        },
                        {
                            path: 'manage',
                            children: [
                            ]
                        },
                        {
                            path: 'support',
                            children: [
                                {
                                    path: 'role',
                                    loadChildren: (): any =>
                                        import('./role/role.module').then(rm => rm.RoleModule)
                                },
                                {
                                    path: 'user',
                                    loadChildren: (): any =>
                                        import('./user/user.module').then(um => um.UserModule)
                                }
                            ]
                        }
                    ]
                },
                {
                    path: '**',
                    redirectTo: '/auth/login'
                }
            ],
            // We expect users to be on desktop or wifi connections, so we use preload-all for
            // better perceived performance
            { initialNavigation: 'disabled', preloadingStrategy: PreloadAllModules }
        ),
        CoreModule,
        SharedModule,
        UiCommonModule,
        UiLibraryModule,
        MatSidenavModule,
        MatGridListModule,
        MatExpansionModule,
        MatCardModule,
        MatInputModule,
        MatIconModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
