import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ToastService } from '@caballus/ui-common';
import { debounceTime, filter, tap } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { LogoutAction } from '@caballus/ui-state';

const DEBOUNCE_TIME_MS = 1000;
const HTTP_UNAUTHORIZED = 401;

@Injectable()
export class NotAuthenticatedInterceptor implements HttpInterceptor {

    private errors$: Subject<HttpErrorResponse> = new Subject();

    constructor(
        private _store: Store,
        private _toast: ToastService
    ) {
        this.errors$.pipe(
            tap(error => console.log('Caught Error: ', error)),
            filter(error => error.status === HTTP_UNAUTHORIZED),
            debounceTime(DEBOUNCE_TIME_MS)
        ).subscribe(() => {
            this._toast.error('Session Expired');
            this._store.dispatch(new LogoutAction(false, true));
        });
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Errors from grid-internal requests aren't caught...
        return next.handle(req).pipe(
            tap({ error: (err): unknown => this.errors$.next(err) })
        );
    }
}
