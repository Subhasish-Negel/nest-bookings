import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((error) => {
          const constraints = Object.values(error.constraints);
          return `${error.property} is missing or invalid: ${constraints.join(", ")}`;
        });
        return new HttpException(messages, HttpStatus.BAD_REQUEST);
      },
    })
  );
  await app.listen(5000);
}
bootstrap();
