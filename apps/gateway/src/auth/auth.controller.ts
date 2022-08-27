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
import { HttpExceptionFilter } from '../filters/http-exeception.filter';
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
    return this.authService.authHealthCheck();
  }

  @Get('error')
  @UseFilters(HttpExceptionFilter)
  handleError() {
    throw new ForbiddenException('Custom error message');
  }
}
