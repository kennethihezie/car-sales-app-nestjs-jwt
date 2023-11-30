import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { Constants } from 'src/utils/contstants';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [  JwtModule.register({
    global: true,
    secret: Constants.SECRET_KEY,
    signOptions: { expiresIn: '2 days' }
  }), UsersModule ]
})
export class AuthModule {}
