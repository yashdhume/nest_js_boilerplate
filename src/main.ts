import { NestFactory } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { AppModule } from '@server/app.module';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ValidationException } from '@server/common/exception/validation.exception';
import { ConfigService } from '@nestjs/config';
import { EnvConstants } from '@server/config/env/env.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const url = configService.get<string>(EnvConstants.url);
  const port = configService.get<number>(EnvConstants.port);
  const config = new DocumentBuilder()
    .setTitle('Server')
    .setDescription('')
    .addServer(url)
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./src/swagger.schema.json', JSON.stringify(document));
  SwaggerModule.setup('api', app, document);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      validationError: {
        target: false,
      },
      errorHttpStatusCode: 400,
      exceptionFactory: (errors: ValidationError[]): ValidationException => {
        return new ValidationException(errors);
      },
    }),
  );

  await app.listen(port);
  console.debug(`Application is running on: ${await app.getUrl()}`);
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
