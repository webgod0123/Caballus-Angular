import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService, ToastService } from '@caballus/ui-common';
import { Router } from '@angular/router';

@Component({
    selector: 'caballus-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent implements OnInit {
    public form: FormGroup = this._formBuilder.group({
        email: [null, [Validators.required, Validators.email]]
    });

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _authService: AuthService,
        private readonly _toastService: ToastService,
        private readonly _router: Router
    ) {}

    public ngOnInit(): void {}

    public forgotPassword({ valid, value }: { valid: boolean; value: { email: string } }): void {
        if (!valid) {
            return;
        }
        this._authService.forgotPassword(value.email).subscribe(
            res => {
                this._toastService.success(`Password reset email sent to ${value.email}`);
                this._router.navigateByUrl('/auth/login');
            },
            err => this._toastService.error(err)
        );
    }
}
