import { Injectable } from '@angular/core';
import { HttpService, Post, Body, ResponseType, Header, Get } from '@rfx/ngx-http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends HttpService {
    @Post('/auth/login')
    public tryLogin(
        @Body('email') email: string,
        @Body('password') password: string
    ): Observable<{ accessToken: string; refreshToken: string }> {
        return null;
    }

    @Get('/auth/refresh', { responseType: ResponseType.Text })
    public refresh(
        @Header('Authorization') refreshToken: string
    ): Observable<string> {
        return null;
    }

    @Post('/auth/forgotPassword')
    public forgotPassword(@Body('email') email: string): Observable<boolean> {
        return null;
    }

    @Post('/auth/resetPassword')
    public resetPassword(
        @Header('Authorization') token: string,
        @Body('password') newPassword: string
    ): Observable<boolean> {
        return null;
    }

}
