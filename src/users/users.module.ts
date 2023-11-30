import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { UsersController } from './users.controller';
import { UserService } from './users.service';

@Module({
  //creates the repository
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
  ],
  controllers: [UsersController],
  exports: [ UserService ]
})

export class UsersModule {}
