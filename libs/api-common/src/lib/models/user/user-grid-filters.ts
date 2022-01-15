import { StringFilter } from '@rfx/common';

export class UserGridFilters {
    public searchTerm: StringFilter;

    constructor(params?: Partial<UserGridFilters>) {
        if (!!params) {
            this.searchTerm = new StringFilter(params.searchTerm);
        } else {
            this.searchTerm = new StringFilter();
        }
    }
}
