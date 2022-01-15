export enum Permission {
    UserCreate = '[Permission] userCreate',
    UserView = '[Permission] userView',
    UserEdit = '[Permission] userEdit',
    UserDelete = '[Permission] userDelete',
    UserDashboard = '[Permission] userDashboard',
    UserImpersonate = '[Permission] userImpersonate',
    UserNotificationsCustomize = '[Permission] userNotificationsCustomize',
    UserNotificationsView = '[Permission] userNotificationsView',
    RoleCreate = '[Permission] roleCreate',
    RoleView = '[Permission] roleView',
    RoleEdit = '[Permission] roleEdit',
    RoleDelete = '[Permission] roleDelete',
    RoleDashboard = '[Permission] roleDashboard',
    TagCreate = '[Permission] tagCreate',
    TagView = '[Permission] tagView',
    TagEdit = '[Permission] tagEdit',
    TagDelete = '[Permission] tagDelete',

    // A special permission used only in the temporary password reset tokens
    ResetPassword = '[Permission] reset password'
}

export namespace Permission {
    export function toString(type: Permission): string {
        switch (type) {
            case Permission.UserCreate:
                return 'User Create';
            case Permission.UserView:
                return 'User View';
            case Permission.UserEdit:
                return 'User Edit';
            case Permission.UserDelete:
                return 'User Delete';
            case Permission.UserDashboard:
                return 'User Dashboard';
            case Permission.UserImpersonate:
                return 'User Impersonate';
            case Permission.UserNotificationsCustomize:
                return 'Notification Customize';
            case Permission.UserNotificationsView:
                return 'Notification View';
            case Permission.RoleCreate:
                return 'Role Create';
            case Permission.RoleView:
                return 'Role View';
            case Permission.RoleEdit:
                return 'Role Edit';
            case Permission.RoleDelete:
                return 'Role Delete';
            case Permission.RoleDashboard:
                return 'Role Dashboard';
            case Permission.TagCreate:
                return 'Create Tag';
            case Permission.TagView:
                return 'View Tag';
            case Permission.TagEdit:
                return 'Edit Tag';
            case Permission.TagDelete:
                return 'Delete Tag';
            default:
                return '';
        }
    }

    export const members: Permission[] = [
        Permission.UserCreate,
        Permission.UserView,
        Permission.UserEdit,
        Permission.UserDelete,
        Permission.UserDashboard,
        Permission.UserImpersonate,
        Permission.UserNotificationsCustomize,
        Permission.UserNotificationsView,
        Permission.RoleCreate,
        Permission.RoleView,
        Permission.RoleEdit,
        Permission.RoleDelete,
        Permission.RoleDashboard,
        Permission.TagCreate,
        Permission.TagView,
        Permission.TagEdit,
        Permission.TagDelete
    ];
}
