import { Module } from '@nestjs/common';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';

@Module({
  imports: [],
  controllers: [GatewayController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useFactory: (config) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            port: 3001,
            host: 'localhost',
          },
        });
      },
      inject: [],
    },
    GatewayService,
  ],
})
export class GatewayModule {}
