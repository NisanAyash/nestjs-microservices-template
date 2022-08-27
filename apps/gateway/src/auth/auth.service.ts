import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, of } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  authHealthCheck() {
    return this.authClient
      .send('auth_health_check', {
        email: 'mosa@gmail.com',
        password: 'password12',
      })
      .pipe(catchError((err) => of({ message: err.message })));

    // ;
  }
}
