import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/config.service';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get(AppConfigService);

  //Swagger
  const config = new DocumentBuilder()
    .setTitle(configService.APP_NAME)
    .setVersion(configService.VERSION)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(configService.SWAGGER_PATH, app, document);

  await app.listen(configService.PORT);

  logger.log(
    `App is listening at PORT ${configService.PORT}`,
  );
}
bootstrap();
