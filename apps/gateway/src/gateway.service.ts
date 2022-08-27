import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class GatewayService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  authHealthCheck() {
    this.authClient.emit('auth_health_check', { message: 'are you alive?' });
  }
}
