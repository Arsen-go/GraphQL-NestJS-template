import * as cookieParser from 'cookie-parser';

import { AppModule } from '@/app.module';
import { Cors } from './config/configure-cors';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { configureHelmet } from './config/configure-helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    autoFlushLogs: true,
    bodyParser: true,
  });

  // Helmet middleware for security
  app.use(configureHelmet());
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));

  // Enable CORS with the correct configuration
  app.enableCors(Cors);

  app.use(cookieParser());

  const port = process.env.PORT || 9393;
  await app.listen(port);

  console.log(`Server started at port ${port}`);
}

bootstrap().catch((err) => {
  console.error('Failed to start the server:', err);
});
