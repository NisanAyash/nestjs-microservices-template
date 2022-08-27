import { MiddlewareConsumer, Module, Scope } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { envSchema } from './config/env.schema';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { SchemaValidationPipe } from './pipes/schema-validation.pipe';
import { HttpExceptionFilter } from './filters/http-exeception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'AUTH_SERVICE',
      useFactory: (config: ConfigService) => {
        const port = config.get('AUTH_SERVICE_PORT');
        const host = config.get('AUTH_SERVICE_HOST');
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            port,
            host,
          },
        });
      },
      inject: [ConfigService],
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   scope: Scope.REQUEST,
    //   useClass: LoggingInterceptor,
    // },
    // { provide: APP_GUARD, useClass: AuthGuard }
    // { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class GatewayModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
