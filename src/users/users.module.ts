import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { CurrentUserMiddleware } from './middlewares/current-user-middleware';
import { User } from './model/user.entity';
import { UsersController } from './users.controller';
import { UserService } from './users.service';

@Module({
  //creates the repository
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService, 
    AuthService, 
    //Provides the current user interceptor to all controllers globally
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor
    },
  ],
  controllers: [UsersController]
})

export class UsersModule {
  //setting up a global middleware
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*')
  }
}
