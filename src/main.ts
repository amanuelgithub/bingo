import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_CONFIG } from './commons/constants';
import { IAppConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // get app config
  // const configService = app.get(ConfigService);
  // const appConfig = configService.get<IAppConfig>(APP_CONFIG);

  // setup api global prefix
  // const globalPrefix = appConfig.APP_PREFIX;
  // app.setGlobalPrefix(globalPrefix);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // const appPort = process.env.PORT || appConfig.APP_PORT;
  // const appPort = 3002;
  const appPort = 5000;

  await app.listen(appPort, () => console.log('running on port: ', appPort));
}
bootstrap();
