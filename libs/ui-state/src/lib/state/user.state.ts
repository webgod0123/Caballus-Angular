import { User, UserService, Permission } from '@caballus/ui-common';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { ImmutableSelector, ImmutableContext } from '@ngxs-labs/immer-adapter';
import { Receiver } from '@ngxs-labs/emitter';
import { FetchUserAction, ClearUserAction, SeenWelcomeModalAction } from '../actions';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export interface UserStateModel {
    user: User;
}

@State<UserStateModel>({
    name: 'user',
    defaults: {
        user: undefined
    }
})
export class UserState {
    @Selector()
    @ImmutableSelector()
    public static user(state: UserStateModel): User {
        return state.user;
    }

    @Selector()
    @ImmutableSelector()
    public static permissions(state: UserStateModel): Permission[] {
        return !!state.user ? state.user.permissions : [];
    }

    @Selector()
    @ImmutableSelector()
    public static seenWelcomeModal(state: UserStateModel): boolean {
        return state.user.settings.seenWelcomeModal;
    }

    constructor(
        private readonly _userService: UserService
    ) {}

    @Action(FetchUserAction)
    public fetchUser(ctx: StateContext<UserStateModel>, action: FetchUserAction): Observable<void> {
        return this._userService
            .getLoggedInUser()
            .pipe(
                tap(user => ctx.setState({ user })),
                switchMap(() => of(void 0))
            );
    }

    @Action(ClearUserAction)
    public clearUser(ctx: StateContext<UserStateModel>, action: ClearUserAction): Observable<void> {
        ctx.setState(patch({ user: undefined }));
        return of(void 0);
    }

    @Action(SeenWelcomeModalAction)
    public setWeenWelcomeModal(
        ctx: StateContext<UserStateModel>,
        action: SeenWelcomeModalAction
    ): Observable<void> {
        ctx.setState({
            ...ctx.getState(),
            user: {
                ...ctx.getState().user,
                settings: {
                    ...ctx.getState().user.settings,
                    seenWelcomeModal: true
                }
            }
        });
        return of(void 0);
    }
}
