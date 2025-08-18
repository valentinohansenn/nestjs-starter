import { NestFactory } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';
import { RolesGuard } from './guard/roles.guard';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new RolesGuard(new Reflector()));
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
}
bootstrap();
