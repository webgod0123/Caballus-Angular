import { AuthState, AuthStateModel } from './auth.state';
import { UserState, UserStateModel } from './user.state';

export const sharedStates = [AuthState, UserState];

export { AuthState, AuthStateModel, UserState, UserStateModel };
