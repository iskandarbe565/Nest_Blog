import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')

  const config=process.env.PORT
  
  app.useGlobalPipes(new ValidationPipe(
  {
    whitelist:true
  }
  ));
  await app.listen(+config,()=>{
    
    console.log(+config);
  });
}
bootstrap();
