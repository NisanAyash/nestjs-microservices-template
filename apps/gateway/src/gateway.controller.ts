import { Controller, Post } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('auth/health')
  authHealthCheck() {
    return this.gatewayService.authHealthCheck();
  }
}
