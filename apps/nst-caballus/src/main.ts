/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import * as helmet from 'helmet';

import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { environment } from '@nst-caballus/env';

import { PermissionGuard } from '@rfx/nst-permissions';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    app.use(helmet());
    app.enableCors({
        origin: '*',
        // Set to 10 minutes based on cap set by Chromium < v76
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age
        maxAge: 600
    });

    // Validators
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true
        })
    );

    const options = new DocumentBuilder()
        .setTitle('caballus Api')
        .setVersion('1.0.1')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);

    const reflector = app.select(AppModule).get(Reflector);
    app.useGlobalGuards(new PermissionGuard(reflector));

    const defaultPort = 3333;
    const port = environment.port || defaultPort;
    await app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}`);
    });
}

bootstrap();
