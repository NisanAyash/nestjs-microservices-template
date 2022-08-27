import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { AuthGuard } from './guards/auth.guard';
import { LoggingInterceptor } from './interceptor/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  // app.use()

  // out from DI
  // app.useGlobalGuards(new AuthGuard());
  // app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
}
bootstrap();
