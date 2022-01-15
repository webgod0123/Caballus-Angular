import { State, Selector, StateContext, Action, Store } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { ImmutableContext, ImmutableSelector } from '@ngxs-labs/immer-adapter';
import { Receiver } from '@ngxs-labs/emitter';
import { AuthService, UserService, ModalService, ITokenPayload } from '@caballus/ui-common';
import {
    LoginAction,
    LogoutAction,
    RefreshAction,
    FetchUserAction,
    ClearUserAction,
    ImpersonateUserAction,
    StopUserImpersonationAction
} from '../actions';
import { Observable, of, interval, from, BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { tap, map, switchMap, withLatestFrom, filter, catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
// import { UserIdleService } from 'angular-user-idle';

/**
 * Auto logout on idle is commented out but can be turned oun by uncommenting related lines in
 * - auth.state (libs/ui-state)
 * - app.component.ts (apps/ngx-caballus)
 * - modal-service.ts (libs/ui-common)
 */

// five minutes total between idle start and logout
// const idleLogoutTimeSeconds: number = 300;
// const idleBeginsAfterSeconds: number = 10;
// const idleLogoutAfterSeconds: number = idleLogoutTimeSeconds - idleBeginsAfterSeconds;
// const idleLogoutWarnBuffer: number = 30;
// const idleLogoutWarnAfterSeconds: number = idleLogoutAfterSeconds - idleLogoutWarnBuffer;
// four and a half minutes in milliseconds
const authRefreshIntervalMs: number = 270000;
const authRefreshPollFrequencyMS: number = 5000;

export interface AuthStateModel {
    token: string;
    refresh: string;
    refreshIntervalMark: number;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        token: undefined,
        refresh: undefined,
        refreshIntervalMark: 0
    }
})
export class AuthState {

    private _refreshPollInterval$: Observable<number> =
        interval(authRefreshPollFrequencyMS);
    private _refreshCondition$: Observable<boolean> =
        this._refreshPollInterval$.pipe(
            withLatestFrom(this._store.select(state => state.auth.refreshIntervalMark)),
            withLatestFrom(this._store.select(state => state.auth.token)),
            map(([[_, mark], token]) => {
                const deltaT = new Date().getTime() - new Date(mark).getTime();
                const lapsed = deltaT >= authRefreshIntervalMs;
                const authenticated = !!token;
                return (authenticated && lapsed);
            })
        );
    // private _timeIdle$: Observable<number> =
    //     this._userIdleService.onTimerStart().pipe(
    //         withLatestFrom(this._store.select(state => state.auth.token)),
    //         filter(([time, token]) => time > 0 && !!token),
    //         tap(([time, token]) =>
    //             this.secondsToIdleLogout$.next(
    //                 idleLogoutTimeSeconds - time
    //             )
    //         ),
    //         map(([time, token]) => time)
    //     );
    // private _idleWarnCondition$: Observable<boolean> =
    //     this._timeIdle$.pipe(
    //         map(time => time === idleLogoutWarnAfterSeconds)
    //     );
    // private _idleLogoutCondition$: Observable<boolean> =
    //     this._timeIdle$.pipe(
    //         map(time => time === idleLogoutAfterSeconds)
    //     );
    // public secondsToIdleLogout$: BehaviorSubject<number> =
    //     new BehaviorSubject(0);
    // public userTookAction$: Subject<void> =
    //     new Subject();

    @Selector()
    @ImmutableSelector()
    public static authToken(state: AuthStateModel): string {
        return state.token;
    }

    @Selector()
    @ImmutableSelector()
    public static tokenPayload(state: AuthStateModel): ITokenPayload | null {
        if (!state.token) {
            return null;
        }

        const parts = state.token.split('.');
        const numJwtParts = 3;
        if (parts.length < numJwtParts) {
            return null;
        }

        try {
            const payload = JSON.parse(atob(parts[1]));
            return payload;
        } catch (_) {
            return null;
        }
    }

    constructor(
        private readonly _authService: AuthService,
        private readonly _userService: UserService,
        private readonly _ngZone: NgZone,
        private readonly _router: Router,
        private readonly _store: Store,
        private readonly _modalService: ModalService,
        // private readonly _userIdleService: UserIdleService
    ) {}

    public ngxsOnInit(ctx: StateContext<AuthStateModel>): void {
        // token refresh interval
        this._refreshCondition$.pipe(
            filter(met => !!met),
            switchMap(_ => this._store.dispatch(new RefreshAction()))
        ).subscribe();
        // idle service setup
        // this._userIdleService.setConfigValues({
        //     idle: idleBeginsAfterSeconds,
        //     timeout: idleLogoutAfterSeconds
        // });
        // this._userIdleService.startWatching();
        // this._userIdleService.onTimeout()
        //     .pipe(finalize(() => this._userIdleService.resetTimer()))
        //     .subscribe();
        // idle driven actions
        // this._idleWarnCondition$
        //     .subscribe(met => {
        //         if (met) {
        //             this._modalService
        //                 .idleLogout(
        //                     this.secondsToIdleLogout$,
        //                     this.userTookAction$
        //                 );
        //         }
        //     });
        // this._idleLogoutCondition$
        //     .subscribe(met => {
        //         if (met) {
        //             this._store.dispatch(new LogoutAction(true, false));
        //         }
        //     });
        // this.userTookAction$
        //     .subscribe(() => this._userIdleService.stopTimer());
    }

    @Action(LoginAction)
    public login(ctx: StateContext<AuthStateModel>, action: LoginAction): Observable<void> {
        return this._authService
            .tryLogin(action.email, action.password)
            .pipe(
                tap((tokens: object) => ctx.setState(patch({ ...tokens }))),
                switchMap(() =>
                    this._store.dispatch([
                        new FetchUserAction()
                    ])),
            );
    }

    @Action(LogoutAction)
    public logout(ctx: StateContext<AuthStateModel>, action: LogoutAction): Observable<void> {
        ctx.setState(patch({ token: undefined, refresh: undefined, refreshIntervalMark: 0 }));
        this._store.dispatch(new ClearUserAction());
        this._modalService.closeAll();
        return from(
            this._ngZone.run(() =>
                this._router.navigate(
                    ['/auth/login'],
                    {
                        queryParams: {
                            idle: action.idle,
                            expired: action.expired
                        }
                    }
                )
            )
        ).pipe(switchMap(() => of(void 0)));
    }

    @Action(RefreshAction)
    public refresh(ctx: StateContext<AuthStateModel>, action: RefreshAction): Observable<void> {
        return this._authService
            .refresh(`Bearer ${ctx.getState().refresh}`)
            .pipe(
                catchError(err => {
                    this._store.dispatch(new LogoutAction(false, true));
                    return of(void 0);
                }),
                tap(token => ctx.setState(patch({ token, refreshIntervalMark: new Date().getTime() }))),
                switchMap(() => of(void 0))
            );
    }

    @Action(ImpersonateUserAction)
    public impersonateUser(
        ctx: StateContext<AuthStateModel>,
        action: ImpersonateUserAction
    ): Observable<void> {
        return this._userService
            .impersonate(action.userId)
            .pipe(
                tap((tokens: object) => ctx.setState(patch({ ...tokens }))),
                switchMap(() => this._store.dispatch(new FetchUserAction()))
            );
    }

    @Action(StopUserImpersonationAction)
    public stopUserImpersonation(
        ctx: StateContext<AuthStateModel>,
        action: StopUserImpersonationAction
    ): Observable<void> {
        return this._userService
            .stopImpersonation()
            .pipe(
                tap((tokens: object) => ctx.setState(patch({ ...tokens }))),
                switchMap(() => this._store.dispatch(new FetchUserAction()))
            );
    }
}
