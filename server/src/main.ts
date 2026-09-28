import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { NestExpressApplication } from '@nestjs/platform-express';
import type { NextFunction, Request, Response } from 'express';

import { AppModule } from './app.module';

/**
 * Ở production, bản web (Expo export) được phục vụ cùng origin với API nên không cần
 * Caddy/nginx và cũng không phát sinh CORS. Ở máy dev thư mục này không tồn tại nên
 * middleware bị bỏ qua và chỉ API chạy.
 */
function serveWebBuild(app: NestExpressApplication, config: ConfigService) {
  const webRoot = resolve(
    config.get<string>('WEB_ROOT') ?? join(process.cwd(), '..', 'web'),
  );

  if (!existsSync(webRoot)) return;

  // `extensions` để /bookings trả về bookings.html do Expo Router static export sinh ra.
  app.useStaticAssets(webRoot, { extensions: ['html'] });

  // Route không khớp file nào thì trả trang 404 của Expo Router, nhưng không nuốt /api.
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    if (req.path.startsWith('/api') || !req.accepts('html')) return next();
    res.status(404).sendFile('+not-found.html', { root: webRoot });
  });
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.enableCors({
    credentials: true,
    origin: (
      config.get<string>('CORS_ORIGIN') ?? 'http://localhost:8081'
    ).split(','),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('TennisHub API')
    .setDescription(
      'API đặt sân TennisHub, dùng chung cho client và khu vực quản trị.',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  SwaggerModule.setup(
    'api/docs',
    app,
    SwaggerModule.createDocument(app, swaggerConfig),
  );

  serveWebBuild(app, config);

  await app.listen(config.get<number>('PORT') ?? 4000);
}

void bootstrap();
