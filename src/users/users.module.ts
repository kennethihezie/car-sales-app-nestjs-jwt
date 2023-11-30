import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Module({
  //creates the repository
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    {
      //Provides the current user interceptor to all controllers globally
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor
    },
  ],
  controllers: [UsersController],
  exports: [ UserService ]
})

export class UsersModule {}
