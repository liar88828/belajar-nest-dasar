import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  Inject,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  UseFilters
} from "@nestjs/common";
import { Request, Response } from "express";
import { UserService } from "./user.service";
import { Connection } from "../connection/connection";
import { MailService } from "../mail/mail.service";
import { UserRepository } from "../user-repository/user-repository";
import { MemberService } from "../member/member.service";
import { User } from "@prisma/client";
import { ValidationFilter } from "../../validation/validation.filter";

// untuk mengubah route
@Controller("api/users")
export class UserController {
  constructor(
    private service: UserService,
    private connection: Connection,
    private mailService: MailService,
    @Inject("EmailService") private emailService: MailService,
    private userRepository: UserRepository,
    private memberService: MemberService
  ) {
  }


  @Post("/create")
  @Header("Content-Type", "application/json")
  async save(@Body() data: { firstName: string, lastName?: string }): Promise<User> {
    if (!data.firstName) throw new HttpException(
      {
        code: 400,
        errors: "First Name is required"
      },
      400);

    return this.userRepository.save(data.firstName, data.lastName);
  }


  // tidak rekomendasi
  // @Inject()
  // @Optional()
  // private service: UserService


  @Get("/connection")
  async getConnection(): Promise<string> {
    this.mailService.send();
    // this.userRepository.save();
    this.emailService.send();

    console.info(this.memberService.getConnection());
    this.memberService.sendEmail();
    return this.connection.getName();
  }

  @Get("/sayHello2")
  @UseFilters(ValidationFilter)
  async sayHello2(
    @Query("name") name: string
  ): Promise<string> {
    return this.service.sayHello2(name);
  }

  @Get("/view/hello")
  viewHello(
    @Query("name") name: string,
    @Res() response: Response) {
    response.render("index.html", {
      title: "Template Engine",
      name: name
    });

  }

  @Get("/get-cookie")
  getCookie(@Req() request: Request): string {
    return request.cookies.name;
  }

  @Get("/set-cookie")
  setCookie(
    @Query("name") name: string,
    @Res() response: Response) {
    response.cookie("name", name);
    response.status(200).send("Set Cookie");
  }

  @Get("Hola")
  async getHola(): Promise<string> {
    return "Hola";
  }

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
  async sayHello(
    @Query("first_name") firstName: string,
    @Query("last_name") lastName: string
  ): Promise<string> {
    return `Hello ${firstName} and ${lastName}`;
  }


  // Tidak di sarankan
  // @Get("/hello")
  // sayHello(@Req() request: Request): string {
  //   return `GET ${request.query.name}`
  // }

  @Get("/:id")
  getById(
    @Param("id") id: string
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
