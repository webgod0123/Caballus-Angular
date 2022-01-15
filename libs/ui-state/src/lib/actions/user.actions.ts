enum UserAction {
    ClearUser = '[UserAction] clearUser',
    FetchUser = '[UserAction] fetchUser',
    SeenWelcomeModal = '[UserAction] seenWelcomeModal',
    ImpersonateUser = '[UserAction] impersonateUser',
    StopUserImpersonation = '[UserAction] stopImpersonation'
}

export class FetchUserAction {
    public static readonly type: UserAction = UserAction.FetchUser;
}

export class ClearUserAction {
    public static readonly type: UserAction = UserAction.ClearUser;
}

export class SeenWelcomeModalAction {
    public static readonly type: UserAction = UserAction.SeenWelcomeModal;
}

export class ImpersonateUserAction {
    public static readonly type: UserAction = UserAction.ImpersonateUser;
    constructor(public userId: string) {}
}

export class StopUserImpersonationAction {
    public static readonly type: UserAction = UserAction.StopUserImpersonation;
}
