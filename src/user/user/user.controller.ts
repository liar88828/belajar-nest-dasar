import { Controller, Get, Header, HttpCode, Param, Post, Query, Redirect } from "@nestjs/common";
import { Request } from "express";

// untuk mengubah route
@Controller("api/users")
export class UserController {

  @Get("sample-response")
  @Header("Content-Type", "application/json")
  @HttpCode(200)
  sampleResponse(): Record<string, string> {
    return { data: "Hello Json" };
  }

  @Get("/redirect")
  @Redirect(
    "sample-response", 301
    //'https://google.com', 301
  )
  redirect() {
    return "hello";
    // {
    //     url:'sample-response',
    //     statusCode:301
    //   }
  }

  // biasa
  // @Get('sample-response')
  // sampleResponse(@Res() response:Response){
  //   // response.status(200).send('Sample response')
  //   response.status(200).json({ data:"Sample response" })
  // }

  // di sarankan
  @Get("/hello")
  sayHello(
    @Query("first_name") firstName: Request,
    @Query("last_name") lastName: Request
  ): string {
    return `Hello ${firstName} and ${lastName}`;
  }


  // Tidak di sarankan
  // @Get("/hello")
  // sayHello(@Req() request: Request): string {
  //   return `GET ${request.query.name}`
  // }

  @Get("/:id")
  getById(
    @Param("id") id: Request
  ): string {
    return `GET ${id}`;
  }

// Tidak di sarankan
  // @Get("/:id")
  // getById(@Req() request: Request): string {
  //   return `GET ${request.params.id}`;
  // }

  @Post()
  post(): string {
    return "POST";
  }

  @Get("/sample")
  get(): string {
    return "Hello nest js";
  }


}
