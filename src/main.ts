import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'verbose', 'debug'],
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${process.env.GRPC_PORT ?? 5016}`,
      package: 'opciones',
      protoPath: join(__dirname, '../proto/opciones/opciones.proto'),
    },
  })

  await app.startAllMicroservices();
  console.log('gRPC microservice is listening on port', process.env.GRPC_PORT ?? 5016);

  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('Gateway para microservicios de agencias, proyectos y relaciones')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3016);
  console.log('REST API is listening on port', process.env.PORT ?? 3016);

}
bootstrap().catch(console.error);
