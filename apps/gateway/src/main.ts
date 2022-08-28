import { NestFactory } from '@nestjs/core';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { GatewayModule } from './gateway.module';
// import { HttpExceptionFilter } from './filters/http-exeception.filter';
// import { AuthGuard } from './guards/auth.guard';
// import { LoggingInterceptor } from './interceptor/logging.interceptor';
// import { SchemaValidationPipe } from './pipes/schema-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  // out from DI
  // app.use()
  // app.useGlobalGuards(new AuthGuard());
  // app.useGlobalInterceptors(new LoggingInterceptor());
  // app.useGlobalPipes(new SchemaValidationPipe());
  // app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    }),
  );

  await app.listen(3000);
}
bootstrap();
