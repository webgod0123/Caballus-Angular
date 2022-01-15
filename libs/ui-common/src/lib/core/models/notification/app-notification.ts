import { AppNotificationWithoutIds } from '@caballus/common';

export class AppNotification extends AppNotificationWithoutIds {
    public _id: string = '';

    constructor(params?: Partial<AppNotification>) {
        super(params);
        if (!!params) {
            this._id = params._id || this._id;
        }
    }
}
