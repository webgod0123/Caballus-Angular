import { Component, HostListener } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { AuthState } from '@caballus/ui-state';

@Component({
    selector: 'caballus-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    // @HostListener('document:mousemove', ['$event'])
    // public onMouseMove(event: MouseEvent): void {
    //     this._authState.userTookAction$.next();
    // }

    // @HostListener('document:keydown', ['$event'])
    // public onKeyDown(event: KeyboardEvent): void {
    //     this._authState.userTookAction$.next();
    // }

    constructor(
        private readonly _authState: AuthState,
        private readonly _router: Router
    ) {
        this._router.initialNavigation();
    }
}
