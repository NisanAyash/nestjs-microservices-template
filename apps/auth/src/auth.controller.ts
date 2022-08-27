import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth_health_check')
  healthCheck(data: any) {
    console.log('AUTH_SERVICE RECEIVED MESSAGE ', data);
    console.count();
    return 'alive';
  }
}
