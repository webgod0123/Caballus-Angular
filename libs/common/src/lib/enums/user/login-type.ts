export enum LoginType {
    Web = '[LoginType] web',
    Facebook = '[LoginType] facebook',
    Google = '[LoginType] google'
}

export namespace LoginType {
    const webAsString = 'Web';
    const webAsInt = 1;
    const facebookAsString = 'Facebook';
    const facebookAsInt = 2;
    const googleAsString = 'Google';
    const googleAsInt = 3;

    export const urlSafeMembers: Array<string | number> = [
        webAsInt,
        webAsString,
        facebookAsInt,
        facebookAsString,
        googleAsInt,
        googleAsString
    ];
    export const members: LoginType[] = [LoginType.Web, LoginType.Facebook, LoginType.Google];

    export function toString(type: LoginType): string {
        switch (type) {
            case LoginType.Web:
                return webAsString;
            case LoginType.Facebook:
                return facebookAsString;
            case LoginType.Google:
                return googleAsString;
            default:
                return '';
        }
    }

    export function toInt(type: LoginType): number {
        switch (type) {
            case LoginType.Web:
                return webAsInt;
            case LoginType.Facebook:
                return facebookAsInt;
            case LoginType.Google:
                return googleAsInt;
            default:
                return 0;
        }
    }

    export function toEnum(val: string | number | LoginType): LoginType {
        switch (val) {
            case webAsString:
            case webAsInt:
            case LoginType.Web:
                return LoginType.Web;
            case facebookAsString:
            case facebookAsInt:
            case LoginType.Facebook:
                return LoginType.Facebook;
            case googleAsString:
            case googleAsInt:
            case LoginType.Google:
                return LoginType.Google;
            default:
                return null;
        }
    }
}
