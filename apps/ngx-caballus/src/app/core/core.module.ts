import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    RfxHttpModule,
    RFX_HTTP_HOST_URL,
    UrlInterceptor,
    AuthInterceptor,
    RFX_HTTP_AUTH_TOKEN_STREAM
} from '@rfx/ngx-http';
import { guards } from './routes/guards';
import { environment } from '@ngx-caballus/env';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxsModule, Store } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsEmitPluginModule } from '@ngxs-labs/emitter';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { sharedStates } from '@caballus/ui-state';
import { Observable } from 'rxjs';
import { NotAuthenticatedInterceptor } from './routes/interceptors';


export function authTokenStream(store: Store): Observable<string> {
    return store.select((state: any): string => state.auth.token);
}

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RfxHttpModule,
        NgxsModule.forRoot(sharedStates, {
            developmentMode: !environment.production,
            selectorOptions: {
                injectContainerState: false,
                suppressErrors: environment.production
            }
        }),
        NgxsStoragePluginModule.forRoot({
            // migrations: migrations
        }),
        // NgxsRouterPluginModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot({
            disabled: environment.production
        }),
        NgxsDispatchPluginModule.forRoot(),
        NgxsEmitPluginModule.forRoot(),
        NgxsSelectSnapshotModule.forRoot()
    ],
    providers: [
        ...guards,
        // { provide: RouterStateSerializer, useClass: DefaultRouterStateSerializer },
        {
            provide: RFX_HTTP_HOST_URL,
            useValue: environment.webserver
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UrlInterceptor,
            multi: true
        },
        {
            provide: RFX_HTTP_AUTH_TOKEN_STREAM,
            useFactory: authTokenStream,
            deps: [Store]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotAuthenticatedInterceptor,
            multi: true
        },
    ]
})
export class CoreModule {}
