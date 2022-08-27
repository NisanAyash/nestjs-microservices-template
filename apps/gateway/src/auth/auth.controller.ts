import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { SchemaValidationPipe } from '../pipes/schema-validation.pipe';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('health')
  // @UseGuards(AuthGuard)
  // @UseGuards(SchemaValidationPipe)
  authHealthCheck(@Body(new SchemaValidationPipe()) body: any) {
    body.something = 'hello';

    console.log(body);
    return this.authService.authHealthCheck();
  }
}
