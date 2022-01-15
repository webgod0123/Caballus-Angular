import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, ToastService } from '@caballus/ui-common';
import { RfxValidators, PasswordStrengthLevel } from '@rfx/ngx-forms';

@Component({
    selector: 'caballus-reset',
    templateUrl: './reset.component.html',
    styleUrls: ['./reset.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetComponent implements OnInit {
    private _token: string = '';
    public resetPasswordForm: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _router: Router,
        private _toastService: ToastService
    ) {}

    ngOnInit(): void {
        this._token = this._activatedRoute.snapshot.queryParamMap.get('token') || '';
        this.resetPasswordForm = this._fb.group({
            password: [
                '',
                [Validators.required, RfxValidators.password(PasswordStrengthLevel.Moderate)]
            ]
        });
    }

    public resetPassword({ valid, value }: { valid: boolean; value: { password: string } }): void {
        if (!valid) {
            return;
        }
        const url = this._authService
            .resetPassword(`Bearer ${this._token}`, value.password)
            .subscribe(
                () => {
                    this._toastService.success('Password Updated Successfully!');
                    this._router.navigateByUrl('/auth/login');
                },
                err => this._toastService.error(err)
            );
    }
}
