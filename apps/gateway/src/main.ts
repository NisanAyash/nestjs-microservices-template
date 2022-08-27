import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exeception.filter';
import { GatewayModule } from './gateway.module';
import { AuthGuard } from './guards/auth.guard';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { SchemaValidationPipe } from './pipes/schema-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  // app.use()

  // out from DI
  // app.useGlobalGuards(new AuthGuard());
  // app.useGlobalInterceptors(new LoggingInterceptor());
  // app.useGlobalPipes(new SchemaValidationPipe());
  // app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
