import { Injectable, Inject, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, of, firstValueFrom, lastValueFrom, timeout } from 'rxjs';
import { SigninRequestDto } from '../dto/signin-request.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  async signin(dto: SigninRequestDto) {
    try {
      const result = await firstValueFrom(
        this.authClient.send('auth_health_check', dto).pipe(timeout(3000)),
      );

      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException({ status: '401', error: error.message }, 401);
    }
  }
}
