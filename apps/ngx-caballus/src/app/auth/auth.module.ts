import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UiCommonModule } from '@caballus/ui-common';
import { UiLibraryModule } from '@caballus/ui-library';
import { SharedModule } from '@ngx-caballus/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { RfxFormsModule } from '@rfx/ngx-forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetComponent } from './pages/reset/reset.component';
import { Register } from './pages/register/register.component';

@NgModule({
    declarations: [LoginComponent, ForgotPasswordComponent, ResetComponent, Register],
    imports: [
        CommonModule,
        UiCommonModule,
        UiLibraryModule,
        SharedModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        RfxFormsModule,
        MatStepperModule,
        MatSelectModule,
        MatCheckboxModule,
        RouterModule.forChild([
            {
                path: 'reset',
                component: ResetComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'forgot',
                component: ForgotPasswordComponent
            },
            {
                path: 'reset',
                component: ResetComponent
            },
            {
                path: 'register',
                component: Register
            },
        ])
    ]
})
export class AuthModule {}
