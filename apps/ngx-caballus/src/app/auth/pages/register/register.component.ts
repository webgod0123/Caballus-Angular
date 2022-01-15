import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { State, RfxValidators, PasswordStrengthLevel, Address } from '@rfx/ngx-forms';
import { ModalService, ToastService, UserService } from '@caballus/ui-common';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { Select } from '@ngxs/store';
import { AuthState } from '@caballus/ui-state';
import { takeUntil, tap, finalize, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'caballus-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Register implements OnInit {
    public State: typeof State = State;

    public form: FormGroup = this._formBuilder.group({
        firstName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, RfxValidators.password(PasswordStrengthLevel.Moderate)]
    });

    public formReady$: BehaviorSubject<boolean> =
        new BehaviorSubject(false);
    public loading$: BehaviorSubject<boolean> =
        new BehaviorSubject(false);
    public acceptedTerms$: BehaviorSubject<boolean> =
        new BehaviorSubject(false);

    public pdfSource: string = '/assets/pdf-sample.pdf';

    private _onDestroy$: Subject<void> =
        new Subject<void>();

    constructor(
        private readonly _formBuilder: FormBuilder,
        private readonly _modalService: ModalService,
        private readonly _cd: ChangeDetectorRef,
        private readonly _toastService: ToastService,
        private readonly _userService: UserService,
        private readonly _router: Router
    ) {}

    public ngOnInit(): void {
        this.form.addControl(
            'confirmPassword',
            new FormControl(
                null,
                RfxValidators.equalTo(
                    this.form.controls.password
                )
            )
        );
        this.formReady$.next(true);
    }

    public ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    public openTermsAndConditionsModal(): void {
        this._modalService
            .termsAndConditions(this.acceptedTerms$.value, this.pdfSource)
            .afterClosed()
            .subscribe(res =>
                this.acceptedTerms$.next(res === true)
            );
    }

    public registerUser({
        valid,
        value
    }: {
        valid: boolean;
        value: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
            confirmPassword: string;
        };
    }): void {
        if (!valid) {
            return;
        }
        this.loading$.next(true);
        this._userService
            .registerUser(this.form.value)
            .pipe(
                tap(() => {
                    this._toastService.success('Successfully registered!');
                    this._router.navigateByUrl('/auth/login');
                }),
                finalize(() => this.loading$.next(false)),
                catchError(err => {
                    console.error(err);
                    this._toastService.error(err);
                    return of(void 0);
                })
            ).subscribe();
    }
}
