import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
    Role,
    RoleService,
    UserService,
    UserCreateDto,
    User,
    Timezone,
    ToastService
} from '@caballus/ui-common';
import { map, finalize, switchMap, catchError, tap, take, shareReplay } from 'rxjs/operators';
import { Observable, BehaviorSubject, of, iif } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { GridParams } from '@rfx/common';

@Component({
    selector: 'caballus-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditComponent implements OnInit {
    public form: FormGroup = this._formBuilder.group({
        roleIds: [null, Validators.required],
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        timezone: [null],
        phone: [null],
        email: [null, Validators.required]
    });
    public timezones: { key: string; name: string }[] =
        Timezone.members.map(t => ({ key: t, name: Timezone.toString(t) }) );
    public submitting$: BehaviorSubject<boolean> =
        new BehaviorSubject(false);
    public roles$: Observable<Role[]> = this._roleService
        .getRoleList(new GridParams())
        .pipe(map(list => list.docs));
    public user$: Observable<User> = this._activatedRoute.paramMap.pipe(
        map(params => params.get('id')),
        switchMap(id =>
            iif(() => !!id,
                this._userService.getUser(id),
                of(null)
            )
        ),
        catchError(err => {
            console.error(err);
            this._toastService.error(err);
            return of(null);
        }),
        tap(user => {
            if (user) {
                this.form.patchValue(
                    UserCreateDto.from(User, user)
                );
            }
        })
    );

    constructor(
        private readonly _router: Router,
        private readonly _activatedRoute: ActivatedRoute,
        private readonly _formBuilder: FormBuilder,
        private readonly _roleService: RoleService,
        private readonly _userService: UserService,
        private readonly _toastService: ToastService
    ) {}

    public ngOnInit(): void {}

    public goBack(): void {
        this._router.navigateByUrl('/support/user/list');
    }

    public onSubmit(): void {
        this.submitting$.next(true);
        const dto = new UserCreateDto(this.form.value);
        this.user$.pipe(
            take(1),
            switchMap(user => !!user
                ? this._userService.editUser(user._id, dto)
                : this._userService.createUser(dto)
            ),
            finalize(() => this.submitting$.next(false)),
            catchError(err => {
                console.error(err);
                this._toastService.error(err);
                return of(null);
            }),
            tap(() => {
                this._toastService.success('Success!');
                this.goBack();
            })
        ).subscribe();
    }
}
