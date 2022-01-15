import { BaseDoc } from '../base/base-doc';
import { TagColor } from '../../enums';

export class TagWithoutIds extends BaseDoc {
    public _id: any;
    public label: string = '';
    public color: TagColor = null;

    constructor(params?: Partial<TagWithoutIds>) {
        super(params);
        if (!!params) {
            this._id = params._id || this._id;
            this.label = params.label || this.label;
            this.color = params.color || this.color;
        }
    }
}
