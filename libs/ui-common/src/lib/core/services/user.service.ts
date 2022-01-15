import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService, Post, Body, Get, Query, Path, MapValue, MapClass, Put } from '@rfx/ngx-http';
import { Observable } from 'rxjs';
import { UserCreateDto, User } from '../models';
import { PaginatedList, GridParams } from '@rfx/common';
import { Permission } from '@caballus/common';

@Injectable({
    providedIn: 'root'
})
export class UserService extends HttpService {
    constructor(private _httpClient: HttpClient) {
        super(_httpClient);
    }

    @Get('/user')
    @MapClass(User)
    public getLoggedInUser(): Observable<User> {
        return null;
    }

    @Post('/user/create')
    public createUser(@Body() body: UserCreateDto): Observable<void> {
        return null;
    }

    @Get('/user/:id')
    @MapClass(User)
    public getUser(@Path('id') id: string): Observable<User> {
        return null;
    }

    @Put('/user/:id')
    public editUser(
        @Path('id') id: string,
        @Body() body: UserCreateDto
    ): Observable<void> {
        return null;
    }

    @Post('/user/list')
    @MapValue(
        res =>
            new PaginatedList<User>({
                count: res.count,
                docs: res.docs.map(d => new User(d))
            })
    )
    public getUserList(@Body() params: GridParams): Observable<PaginatedList<User>> {
        return null;
    }

    @Put('/user/seenWelcomeModal')
    public seenWelcomeModal(): Observable<any> {
        return null;
    }

    @Get('/user/permissions')
    public getUserPermissions(): Observable<Permission[]> {
        return null;
    }

    @Post('/user/register')
    public registerUser(@Body() body: {
        firstName: string,
        lastName: string,
        email: string,
        password: string
    }): Observable<void> {
        return null;
    }

    @Get('/user/impersonate/start/:id')
    public impersonate(
        @Path('id') id: string
    ): Observable<{ accessToken: string; refreshToken: string }> {
        return null;
    }

    @Get('/user/impersonate/stop')
    public stopImpersonation(): Observable<{ accessToken: string; refreshToken: string }> {
        return null;
    }

    /*
        The delete() method of Angular's HttpClient class
        does not directly support attaching a request body,
        so we need to use the request() method directly instead.

        Pat D Jun 23 2021
    */
    public deleteUsers(
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
            '/user',
            options
        );
    }
}
