import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './cats/middleware/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './pipes/validation.pipe';
import { RolesGuard } from './guard/roles.guard';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/{*splat}',
      )
      .forRoutes(CatsController);
    //   Route wildcards (splat is simply the name of the wildcard parameters)
    //   .forRoutes({ path: "abcd/*splat", method: RequestMethod.ALL })
  }
}
