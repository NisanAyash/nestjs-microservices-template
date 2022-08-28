import { Controller, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { ExceptionFilter } from './filters/rpc-exception.filter';
import { SigninRequestDto } from './dto/signin-request.dto';

@Controller()
export class AuthController {
  private users: { username: string }[] = [{ username: 'nisan' }];

  constructor(private readonly authService: AuthService) {}

  @UseFilters(new ExceptionFilter())
  @MessagePattern('auth_health_check')
  async healthCheck(dto: SigninRequestDto) {
    const { email, password } = dto;
    return dto;
    // throw new RpcException(`UnauthorizedException aaaaaaaaaaaaaaaa`);
  }
}
