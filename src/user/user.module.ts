import { Module } from "@nestjs/common";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
import { Connection, createConnection } from "./connection/connection";
import { MailService, mailServiceProvide } from "./mail/mail.service";
import { UserRepository } from "./user-repository/user-repository";
import { MemberService } from "./member/member.service";
import { ConfigService } from "@nestjs/config";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserService,
    //Connection,
    {
      provide: Connection,
      useFactory: createConnection,
      inject: [ConfigService]
      // useClass:
      //   process.env.DATANASE === "mysql" ?
      //     MySQLConnection :
      //     MongoDBConnection
    },
    // MailService
    {
      provide: MailService,
      useValue: mailServiceProvide
    },
    UserRepository,
    // {
    //   provide: UserRepository,
    //   useFactory: createUserRepository,
    //   inject: [Connection]
    // },
    {
      provide: "EmailService",
      useExisting: MailService
    },
    MemberService
  ],
  exports: [UserService]
})
export class UserModule {
}
