import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/users/users.module';
import { ReportsModule } from 'src/reports/reports.module';
import { User } from 'src/users/model/user.entity';
import { Report } from 'src/reports/model/report.entity';
import { JwtModule } from '@nestjs/jwt';
import { Constants } from 'src/utils/contstants';
import { AuthModule } from 'src/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';


@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [ User, Report ],
    synchronize: true
  }), 
    JwtModule.register({
      global: true,
      secret: Constants.SECRET_KEY,
      signOptions: { expiresIn: '2 days' }
    }),
    UsersModule, 
    ReportsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
})
export class AppModule {}
