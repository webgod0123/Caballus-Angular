import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UserStateModel } from '@caballus/ui-state';
import { ToastService, Permission, User } from '@caballus/ui-common';

@Injectable()
export class PermissionGuard implements CanActivate {

    constructor(
        private readonly _router: Router,
        private readonly _toast: ToastService,
        private readonly _store: Store
    ) {}

    public canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

        const data = next.data['permission'];
        let required: Permission[] = null;

        if (!data) {
            return true;
        } else if (typeof data === 'string') {
            required = [data as Permission];
        } else if (Array.isArray(data)) {
            required = data as Permission[];
        } else {
            console.error('Invalid route permissions', data);
            return false;
        }

        let pass: boolean = false;
        const all: boolean = next.data['requireAll'] || false;
        const user = this._store.selectSnapshot<User>(store => {
            const m: UserStateModel = store['user'];
            return m.user;
        });

        if (all) {
            pass = true;
            for (const r of required) {
                if (!user.permissions.includes(r)) {
                    pass = false;
                    break;
                }
            }
        } else {
            pass = false;
            for (const r of required) {
                if (user.permissions.includes(r)) {
                    pass = true;
                    break;
                }
            }
        }

        if (!pass) {
            this._toast.error('No Access');
            this._router.navigateByUrl('/dashboard');
        }

        return pass;
    }
}
