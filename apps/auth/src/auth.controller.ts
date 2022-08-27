import {
  Controller,
  HttpCode,
  UnauthorizedException,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { ExceptionFilter } from '@app/common';

@Controller()
export class AuthController {
  private users: { username: string }[] = [{ username: 'nisan' }];

  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth_health_check')
  async healthCheck(data: any) {
    const { email, password } = data;

    return 'ok';
  }
}
