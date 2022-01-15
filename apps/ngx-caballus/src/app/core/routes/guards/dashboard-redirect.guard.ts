import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class DashboardRedirectGuard implements CanActivate {
    constructor(private _router: Router) {}

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this._router.navigateByUrl('/dashboard/admin');
        return false;
    }
}
