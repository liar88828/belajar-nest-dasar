import { Controller, Get, Post } from "@nestjs/common";

// untuk mengubah route
@Controller("api/users")
export class UserController {

  @Post()
  post(): string {
    return "POST";
  }

  @Get('/sample')
  get(): string {
    return "Hello nest js";
  }


}
