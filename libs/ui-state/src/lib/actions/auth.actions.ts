enum AuthAction {
    Login = '[AuthAction] login',
    Logout = '[AuthAction] logout',
    Refresh = '[AuthAction] refresh'
}

export class LoginAction {
    public static readonly type: AuthAction = AuthAction.Login;
    constructor(public email: string, public password: string) {}
}

export class LogoutAction {
    public static readonly type: AuthAction = AuthAction.Logout;
    constructor(
        public idle: boolean = false,
        public expired: boolean = false
    ) {}
}

export class RefreshAction {
    public static readonly type: AuthAction = AuthAction.Refresh;
}
