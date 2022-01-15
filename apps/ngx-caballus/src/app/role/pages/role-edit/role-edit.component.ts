import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, iif, of, BehaviorSubject } from 'rxjs';
import { Role, RoleService, ToastService, RoleCreateDto, Permission } from '@caballus/ui-common';
import { map, tap, switchMap, catchError, finalize, take } from 'rxjs/operators';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'caballus-role-edit',
    templateUrl: './role-edit.component.html',
    styleUrls: ['./role-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleEditComponent implements OnInit {
    public Permission: typeof Permission = Permission;
    public form: FormGroup = this._formBuilder.group({
        name: [null, Validators.required],
        permissions: this._formBuilder.group({})
    });
    public formReady$: BehaviorSubject<boolean> =
        new BehaviorSubject(false);
    public submitting$: BehaviorSubject<boolean> =
        new BehaviorSubject(false);
    public role$: Observable<Role> = this._activatedRoute.paramMap.pipe(
        map(params => params.get('id')),
        switchMap(id =>
            iif(() => !!id,
                this._roleService.getRole(id),
                of(null)
            )
        ),
        catchError(err => {
            console.error(err);
            this._toastService.error(err);
            return of(null);
        }),
        tap(role => {
            if (!!role) {
                this.form.patchValue(role);
            }
        })
    );

    constructor(
        private readonly _activatedRoute: ActivatedRoute,
        private readonly _roleService: RoleService,
        private readonly _toastService: ToastService,
        private readonly _formBuilder: FormBuilder,
        private readonly _router: Router
    ) {}

    public ngOnInit(): void {
        this.role$.pipe(
            take(1),
            tap(role => {
                for (const m of Permission.members) {
                    const checked = !!role &&
                        role.permissions.includes(m);
                    this.pGroup().addControl(
                        m,
                        new FormControl(checked)
                    );
                }
                if (!!role && !role.settings.canEdit) {
                    this.form.disable();
                }
                this.formReady$.next(true);
            })
        ).subscribe();
    }

    public pGroup(): FormGroup {
        return this.form.controls.permissions as FormGroup;
    }

    public onSubmit(): void {
        if (this.form.invalid) {
            this._toastService.error('Check form for errors');
            return;
        }
        const permissions: Permission[] = [];
        Object.keys(this.form.value.permissions).forEach(k => {
            if (this.form.value.permissions[k]) {
                permissions.push(k as Permission);
            }
        });
        const dto = new RoleCreateDto({
            name: this.form.value.name,
            permissions
        });
        this.role$.pipe(
            take(1),
            tap(() => this.submitting$.next(true)),
            switchMap(role => !!role
                ? this._roleService.editRole(role._id, dto)
                : this._roleService.createRole(dto)
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

    public goBack(): void {
        this._router.navigateByUrl('/support/role/list');
    }
}
