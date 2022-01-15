import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { State, StateContext } from '@ngxs/store';
import { Emitter, Emittable, Receiver } from '@ngxs-labs/emitter';
import { ImmutableContext, ImmutableSelector } from '@ngxs-labs/immer-adapter';

interface RouterStateModel {
    history: NavigationEnd[];
    state: RouterStateSnapshot;
    navigationId: number;
}

import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export abstract class RouterStateSerializer<T> {
    public abstract serialize(routerState: RouterStateSnapshot): T;
}

export interface SerializedRouterStateSnapshot {
    root: ActivatedRouteSnapshot;
    url: string;
}

export class DefaultRouterStateSerializer
    implements RouterStateSerializer<SerializedRouterStateSnapshot> {
    public serialize(routerState: RouterStateSnapshot): SerializedRouterStateSnapshot {
        return {
            root: this.serializeRoute(routerState.root),
            url: routerState.url
        };
    }

    private serializeRoute(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
        const children = route.children.map(c => this.serializeRoute(c));
        return {
            url: route.url,
            params: route.params,
            queryParams: route.queryParams,
            fragment: route.fragment,
            data: route.data,
            outlet: route.outlet,
            component: null,
            routeConfig: null,
            root: null as any,
            parent: null,
            firstChild: children[0],
            children: children,
            pathFromRoot: null as any,
            paramMap: route.paramMap,
            queryParamMap: route.queryParamMap,
            toString: route.toString
        };
    }
}

@State<RouterStateModel>({
    name: 'router',
    defaults: {
        history: [],
        state: {
            root: undefined,
            url: undefined
        },
        navigationId: undefined
    }
})
export class RouterState {
    private static _router: Router;
    private static _serializer: RouterStateSerializer<RouterStateSnapshot>;

    constructor(router: Router, _serializer: RouterStateSerializer<RouterStateSnapshot>) {
        RouterState._router = router;
        RouterState._serializer = _serializer;
    }

    @Receiver()
    @ImmutableContext()
    public static navigateBack({ setState, getState }: StateContext<RouterStateModel>): void {
        const s = getState();
        // Must have at least 2 history items to be able to go back
        if (s.history.length > 1) {
            const previousIndex = 2;
            const lastNavigation = s.history[s.history.length - previousIndex];
            setState(state => {
                state.history.pop();
                return state;
            });
            RouterState._router.navigateByUrl(lastNavigation.url);
        }
    }

    @Receiver()
    @ImmutableContext()
    public static navigationEnd(
        { setState }: StateContext<RouterStateModel>,
        { payload }: { payload: NavigationEnd }
    ): void {
        setState((state: RouterStateModel) => {
            state.state = RouterState._serializer.serialize(
                RouterState._router.routerState.snapshot
            );
            state.navigationId = payload.id;
            if (!state.history) {
                state.history = [];
            } else {
                state.history = state.history.filter(h => h.id < payload.id);
            }
            state.history.push(payload);
            return state;
        });
    }
}

@Injectable({
    providedIn: 'root'
})
export class RouterStateService {
    @Emitter(RouterState.navigationEnd)
    private _navigationEnd: Emittable<NavigationEnd>;

    constructor(private _router: Router) {
        // this._router.events
        //     .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
        //     .subscribe(res => {
        //         this._navigationEnd.emit(res);
        //     });
    }
}
