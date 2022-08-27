import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        API_GATEWAY_PORT: Joi.number().required(),
        AUTH_SERVICE_PORT: Joi.number().required(),
        AUTH_SERVICE_HOST: Joi.string().required(),
      }),
    }),
  ],
  controllers: [GatewayController],
  providers: [
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
    GatewayService,
  ],
})
export class GatewayModule {}
