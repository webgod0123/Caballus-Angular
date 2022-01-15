import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { LoginAction } from '@caballus/ui-state';
import { AuthService, ToastService, UserService, User } from '@caballus/ui-common';
import { Observable, BehaviorSubject, of, combineLatest } from 'rxjs';
import { finalize, catchError, map, startWith, withLatestFrom } from 'rxjs/operators';
import { environment } from '@ngx-caballus/env';

@Component({
    selector: 'caballus-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
    public loading$: BehaviorSubject<boolean> =
        new BehaviorSubject(false);

    public loginForm: FormGroup = this._fb.group({
        email: [null, [Validators.required, Validators.email]],
        password: [null, Validators.required]
    });

    private _redirect$: Observable<string> = this._activatedRoute
        .queryParamMap.pipe(
            // Typecast null to work around lint issue originating from
            // https://github.com/ReactiveX/rxjs/issues/4723
            //
            // null was being applied to a deprecated overload of the startWith
            // operator which was tripping a lint error for using deprecated
            // functions even though only that specific overload of startWith
            // is deprecated.
            startWith(null as ParamMap),
            map(qpm => !!qpm && !!qpm.get('redirect')
                ? qpm.get('redirect') : ''
            )
        );
    public expired$: Observable<boolean> = this._activatedRoute
        .queryParamMap.pipe(
            map(qpm => !!qpm && typeof qpm.get('expired') === 'string'
                ? qpm.get('expired') === 'true' : false
            )
        );
    public idle$: Observable<boolean> = this._activatedRoute
        .queryParamMap.pipe(
            map(qpm => !!qpm && typeof qpm.get('idle') === 'string'
                ? qpm.get('idle') === 'true' : false
            )
        );
    public message$: Observable<string> = combineLatest([
        this.expired$,
        this.idle$
    ]).pipe(
        map(([expired, idle]) => {
            if (idle) {
                return 'Logged out due to inactivity.';
            } else if (expired) {
                return 'Session expired.';
            } else {
                return '';
            }
        })
    );

    constructor(
        private readonly _fb: FormBuilder,
        private readonly _authService: AuthService,
        private readonly _userService: UserService,
        private readonly _toastService: ToastService,
        private readonly _activatedRoute: ActivatedRoute,
        private readonly _router: Router,
        private readonly _store: Store
    ) {}

    public ngOnInit(): void {
        if (!environment.production) {
            this.loginForm.controls.email.setValue('ben@riafox.com');
            this.loginForm.controls.password.setValue('Ria@12345');
        }
    }

    public tryLogin({
        valid,
        value
    }: {
        valid: boolean;
        value: { email: string; password: string };
    }): void {
        console.log(value);
        if (!valid) {
            return;
        }
        this.loading$.next(true);
        this._store
            .dispatch(new LoginAction(value.email, value.password))
            .pipe(
                withLatestFrom(this._redirect$),
                map(([_, redirect]) => redirect),
                finalize(() => this.loading$.next(false)),
                catchError(err => {
                    this._toastService.error(err);
                    return of(null);
                })
            )
            .subscribe(redirect =>
                this._router.navigateByUrl(redirect || '/dashboard')
            );
    }
}
