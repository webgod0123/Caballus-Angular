import { Permission } from '@caballus/common';
import { ChildMenuItem } from './child-menu-item';

export class MenuItem {
    public label: string = '';
    public active: boolean = false;
    public route: string = null;
    public icon: [string, string] = ['', ''];
    public permission: Permission | null = null;
    public children?: Array<ChildMenuItem> = [];

    constructor(params?: Partial<MenuItem>) {
        if (!!params) {
            this.label = params.label || this.label;
            this.active = params.active || this.active;
            this.route = params.route || this.route;
            this.icon = Array.isArray(params.icon) ? params.icon : this.icon;
            this.permission = params.permission || this.permission;
            this.children = Array.isArray(params.children)
                ? params.children.map(c => new ChildMenuItem(c))
                : this.children;
        }
    }
}
