import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService, Post, Put, Get, MapValue, Body, Path, MapClass } from '@rfx/ngx-http';
import { Role, RoleCreateDto } from '../models';
import { Observable } from 'rxjs';
import { PaginatedList, GridParams } from '@rfx/common';

@Injectable({
    providedIn: 'root'
})
export class RoleService extends HttpService {
    constructor(private _httpClient: HttpClient) {
        super(_httpClient);
    }

    @Post('/role/list')
    @MapValue(
        res =>
            new PaginatedList<Role>({
                count: res.count,
                docs: res.docs.map(d => new Role(d))
            })
    )
    public getRoleList(@Body() params: GridParams): Observable<PaginatedList<Role>> {
        return null;
    }

    @Get('/role/list/available')
    @MapValue(Role)
    public getAvailableRoleList(): Observable<Role[]> {
        return null;
    }

    /*
        The delete() method of Angular's HttpClient class
        does not directly support attaching a request body,
        so we need to use the request() method directly instead.

        Pat D Jun 23 2021
    */
    public deleteRoles(
        ids: string[]
    ): Observable<void> {
        const options = {
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                ids: ids
            }
        };
        return this._httpClient.request<void>(
            'delete',
            '/role',
            options
        );
    }

    @Get('/role/:id')
    @MapClass(Role)
    public getRole(@Path('id') id: string): Observable<Role> {
        return null;
    }

    @Post('/role')
    public createRole(@Body() body: RoleCreateDto): Observable<void> {
        return null;
    }

    @Put('/role')
    @MapClass(Role)
    public editRole(@Body('id') id: string, @Body() dto: RoleCreateDto): Observable<Role> {
        return null;
    }

    @Get('/role')
    @MapClass(Role)
    public getRoles(): Observable<Role[]> {
        return null;
    }
}
