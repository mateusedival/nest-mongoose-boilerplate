import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'aws-sdk';
import { AppModule } from './modules/app.module';
import { HttpLoggingInterceptor } from './shared/interceptors/http-logging.interceptor';
import { ValidationPipe } from './shared/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log', 'verbose', 'warn'],
  });

  app.useGlobalInterceptors(new HttpLoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  config.update({
    credentials: {
      accessKeyId: configService.get<string>('S3_ACCESS_KEY_ID'),
      secretAccessKey: configService.get<string>('S3_SECRET_ACCESS_KEY'),
    },
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle("API's boilerplate")
    .addBearerAuth()
    .setVersion('0.1')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(3002);
}
bootstrap();
