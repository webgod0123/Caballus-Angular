import { Controller, Post, Body, Put, Param, Get, Delete, Query } from '@nestjs/common';
import { RoleService } from '@nst-caballus/dal';
import { LoggedInUser, Secured, WildCardPermission, Anonymous } from '@rfx/nst-permissions';
import { ApiOperation, ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { User, Permission, Role } from '@caballus/api-common';
import { RoleDto } from './dto/role.dto';
import { ObjectId, IdDto } from '@rfx/nst-db/mongo';
import { PaginatedListModel } from '@rfx/common';
import { RoleParamsDto } from './dto/role-params.dto';
import { IdListDto } from '../id-list.dto';

@ApiBearerAuth()
@ApiUseTags('role')
@Controller('role')
export class RoleController {
    constructor(private readonly _roleService: RoleService) {}

    @Get('')
    @ApiOperation({ title: 'Get Roles' })
    @Secured(Permission.RoleView)
    public async getRoles(): Promise<Role[]> {
        return this._roleService.getRoles();
    }

    @Post('')
    @ApiOperation({ title: 'Create Role' })
    @Secured(Permission.RoleCreate)
    public async createRole(@Body() dto: RoleDto): Promise<ObjectId> {
        return this._roleService.createRole(dto);
    }

    @Put('')
    @ApiOperation({ title: 'Edit Role' })
    @Secured(Permission.RoleEdit)
    public async editRole(@Body() idDto: IdDto, @Body() dto: RoleDto): Promise<void> {
        return this._roleService.updateRole(idDto.id, dto);
    }

    @Delete('')
    @Secured(Permission.RoleDelete)
    public async deleteRoles(
        @Body() idListDto: IdListDto
    ): Promise<void> {
        return this._roleService.deleteRolesByIdList(idListDto.ids);
    }

    @Post('list')
    @ApiOperation({
        title: 'Roles List',
        description: `List all active roles`
    })
    @ApiBearerAuth()
    @Secured(Permission.RoleView)
    public async listGridStringTermFilter(
        @Body() dto: RoleParamsDto
    ): Promise<PaginatedListModel<Role>> {
        return this._roleService.getGridRoles(dto.toRoleGridParams());
    }

    @Get(':id')
    @ApiOperation({ title: 'Get Role' })
    @Secured(Permission.RoleView)
    public async getRole(@Param() idDto: IdDto, @LoggedInUser() user: User): Promise<Role> {
        return this._roleService.getRoleById(idDto.id);
    }
}
