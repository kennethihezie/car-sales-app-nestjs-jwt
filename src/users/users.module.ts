import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUserMiddleware } from './middlewares/current-user-middleware';

@Module({
  //creates the repository
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    {
      //Provides the current user interceptor to all controllers globally on this module
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  controllers: [UsersController],
  exports: [ UserService ]
})

export class UsersModule {
  //setting up a global middleware
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*')
  }
}
