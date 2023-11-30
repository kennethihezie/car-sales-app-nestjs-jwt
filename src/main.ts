import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module'; 


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(cookieSession({
  //   //A key can be any random string used to encrypt an data.
  //   keys: ['azreal']
  // }))
  
  //using global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      //to make sure that incoming requests don't have extrnous request on our body.
      whitelist: true
    })
  )
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
