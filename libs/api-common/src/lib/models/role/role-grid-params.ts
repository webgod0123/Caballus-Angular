import { RoleGridFilters } from './role-grid-filters';
import { GridParams, GridParamsModel } from '@rfx/common';

export class RoleGridParams {
    public grid: GridParams;
    public filters: RoleGridFilters;

    constructor(gridParams?: Partial<GridParamsModel>, filterParams?: Partial<RoleGridFilters>) {
        this.grid = new GridParams(gridParams);
        this.filters = new RoleGridFilters(filterParams);
    }
}
