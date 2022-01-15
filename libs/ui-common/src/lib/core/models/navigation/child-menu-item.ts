import { Permission } from '@caballus/common';

export class ChildMenuItem {
    public label: string = '';
    public active: boolean = false;
    public route: string = null;
    public permission: Permission | null = null;

    constructor(params?: Partial<ChildMenuItem>) {
        if (!!params) {
            this.label = params.label || this.label;
            this.active = params.active || this.active;
            this.route = params.route || this.route;
            this.permission = params.permission || this.permission;
        }
    }
}
