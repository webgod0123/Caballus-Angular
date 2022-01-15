import { StringFilter } from '@rfx/common';

export class RoleGridFilters {
    public searchTerm: StringFilter;

    constructor(params?: Partial<RoleGridFilters>) {
        if (!!params) {
            this.searchTerm = new StringFilter(params.searchTerm);
        } else {
            this.searchTerm = new StringFilter();
        }
    }
}
