import { UserGridFilters } from './user-grid-filters';
import { GridParams, GridParamsModel } from '@rfx/common';

export class UserGridParams {
    public grid: GridParams;
    public filters: UserGridFilters;

    constructor(gridParams?: Partial<GridParamsModel>, filterParams?: Partial<UserGridFilters>) {
        this.grid = new GridParams(gridParams);
        this.filters = new UserGridFilters(filterParams);
    }
}
