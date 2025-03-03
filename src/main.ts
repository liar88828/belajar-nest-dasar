import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import * as mustache from "mustache-express";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { ValidationFilter } from "./validation/validation.filter";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser("Rahasia"));

  const loggerService = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(loggerService);

  app.set("views", __dirname + "/../views");
  app.set("view engine", "html");
  app.engine("html", mustache());

  app.useGlobalFilters(new ValidationFilter());
  // app.useGlobalPipes() # hati-hati value tipe data
  // app.useGlobalInterceptors( )# hati hati return tipe data
  // app.useGlobalGuards() # hati hati tidak semua role sama

  app.enableShutdownHooks();

  const configService = app.get(ConfigService);
  // add .env
  await app.listen(configService.get("PORT"));
}

bootstrap();
