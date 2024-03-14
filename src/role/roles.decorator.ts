import "reflect-metadata";
import { Reflector } from "@nestjs/core";

export const Roles = Reflector.createDecorator<string[]>();
