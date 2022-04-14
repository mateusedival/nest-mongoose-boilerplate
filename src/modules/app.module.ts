import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import LogsMiddleware from '../shared/middlewares/logs.middleware';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProductsModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('test'),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        TEST_DATABASE_USER: Joi.string().required(),
        TEST_DATABASE_PASSWORD: Joi.string().required(),
        TEST_DATABASE_NAME: Joi.string().required(),
      }),
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        if (configService.get('NODE_ENV') === 'test') {
          const username = configService.get('TEST_DATABASE_USER');
          const password = configService.get('TEST_DATABASE_PASSWORD');
          const database = configService.get('TEST_DATABASE_NAME');
          const host = configService.get('DATABASE_HOST');

          return {
            authSource: 'admin',
            auth: { username, password },
            uri: `mongodb://${host}/${database}`,
          };
        }

        const username = configService.get('DATABASE_USER');
        const password = configService.get('DATABASE_PASSWORD');
        const database = configService.get('DATABASE_NAME');
        const host = configService.get('DATABASE_HOST');

        return {
          authSource: 'admin',
          auth: { username, password },
          uri: `mongodb://${host}/${database}`,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
