import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  Post,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { SigninRequestDto } from '../dto/signin-request.dto';
import { HttpExceptionFilter } from '../filters/http-exeception.filter';
import { AuthGuard } from '../guards/auth.guard';
import { SchemaValidationPipe } from '../pipes/schema-validation.pipe';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() body: SigninRequestDto) {
    return this.authService.signin(body);
  }

  @Get('error')
  @UseFilters(HttpExceptionFilter)
  handleError() {
    throw new ForbiddenException('Custom error message');
  }
}
