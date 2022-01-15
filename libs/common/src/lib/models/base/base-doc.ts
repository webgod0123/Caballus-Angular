import { Status } from '../../enums';
import { parseISODate } from '@rfx/common';
import { isNull } from '../../utils';

export class BaseDoc {
    public createdDate: Date = new Date();
    public modifiedDate: Date = new Date();
    public status: Status = Status.Active;

    constructor(params?: Partial<BaseDoc>) {
        if (!!params) {
            this.createdDate = !!params.createdDate
                ? parseISODate(params.createdDate)
                : this.createdDate;
            this.modifiedDate = !!params.modifiedDate
                ? parseISODate(params.modifiedDate)
                : this.modifiedDate;
            this.status = !isNull(params.status) ? params.status : this.status;
        }
    }
}
