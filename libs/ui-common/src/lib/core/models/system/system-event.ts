import { SystemEventType } from '../../enums';

export class SystemEvent {
    public type: SystemEventType;
    public data?: any;

    constructor(params: SystemEvent) {
        this.type = params.type;
        this.data = params.data || this.data;
    }
}
