export class RoleSettings {
    public canEdit: boolean = false;
    public canDelete: boolean = false;
    public newUserDefault: boolean = false;

    constructor(params?: Partial<RoleSettings>) {
        if (!!params) {
            this.canEdit = typeof params.canEdit === 'boolean'
                ? params.canEdit : this.canEdit;
            this.canDelete = typeof params.canDelete === 'boolean'
                ? params.canDelete : this.canDelete;
            this.newUserDefault = typeof params.newUserDefault === 'boolean'
                ? params.newUserDefault : this.newUserDefault;
        }
    }
}
