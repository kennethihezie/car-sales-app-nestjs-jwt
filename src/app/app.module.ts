import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'src/users/users.module';
import { ReportsModule } from 'src/reports/reports.module';
import { User } from 'src/users/model/user.entity';
import { Report } from 'src/reports/model/report.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
    inject: [ ConfigService ],
    useFactory: (config: ConfigService) => {      
      return {
        type: 'sqlite',
        database: config.get<string>('DB_NAME'),
        entities: [ User, Report ],
        // DO not make use of synchronize in production
        synchronize: true,
      }
    }
  }), 
    UsersModule, 
    ReportsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
