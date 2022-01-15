import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState, AuthStateModel } from '@caballus/ui-state';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly _router: Router,
        private readonly _store: Store
    ) {}

    public canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        const authenticated = this._store.selectSnapshot<boolean>(store => {
            const m: AuthStateModel = store['auth'];
            return !!m.token;
        });

        if (!authenticated) {
            this._router.navigate(
                ['/auth/login'],
                { queryParams: { redirect: state.url } }
            );
        }

        return authenticated;
    }
}
