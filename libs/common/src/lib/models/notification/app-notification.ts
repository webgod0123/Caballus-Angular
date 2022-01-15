import { BaseDoc } from '../base/base-doc';

export class AppNotificationWithoutIds extends BaseDoc {
    public _id: any;
    public title: string = '';
    public description: string = '';

    constructor(params?: Partial<AppNotificationWithoutIds>) {
        super(params);
        if (!!params) {
            this._id = params._id || this._id;
            this.title = params.title || this.title;
            this.description = params.description || this.description;
        }
    }
}
