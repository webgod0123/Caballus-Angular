import { Module } from '@nestjs/common';
import { controllerModules } from '@nst-caballus/controllers';
import { dalModules } from '@nst-caballus/dal';
import { PermissionsModule, JwtAuthGuard } from '@rfx/nst-permissions';
import { DbModule, ConnectionType } from '@rfx/nst-db';
import { environment } from '@nst-caballus/env';
import { JwtStrategy } from './jwt-strategy';
import { APP_GUARD } from '@nestjs/core';
import { MailerModule, SendGridMailerOptions } from '@rfx/nst-mailer';
import { FileModule, GoogleFileOptions } from '@rfx/nst-file';

@Module({
    imports: [
        DbModule.forRoot({
            name: '',
            type: ConnectionType.MongoDB,
            ...environment.mongo
        }),
        MailerModule.forRoot(new SendGridMailerOptions(environment.sendgrid)),
        PermissionsModule.forRoot({
            secretKey: environment.secretKey,
            expiresSeconds: 3600
        }),
        FileModule.forRoot(
            new GoogleFileOptions({
                baseStorageUrl: 'https://storage.googleapis.com',
                bucket: environment.google.bucket,
                keyFilename: '',
                projectId: environment.google.projectId,
                signedUrlExpireTime: null
            })
        ),
        ...controllerModules,
        ...dalModules
    ],
    controllers: [],
    providers: [JwtStrategy, { provide: APP_GUARD, useClass: JwtAuthGuard }]
})
export class AppModule {}
