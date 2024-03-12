import { Module } from "@nestjs/common";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
import { Connection, MongoDBConnection, MySQLConnection } from "./connection/connection";
import { MailService, mailServiceProvide } from "./mail/mail.service";
import { createUserRepository, UserRepository } from "./user-repository/user-repository";

@Module({
  controllers: [UserController],
  providers: [UserService,
    //Connection,
    {
      provide: Connection,
      useClass:
        process.env.DATANASE === "mysql" ?
          MySQLConnection :
          MongoDBConnection
    },
    // MailService
    {
      provide: MailService,
      useValue: mailServiceProvide
    },
    // UserRepository
    {
      provide: UserRepository,
      useFactory: createUserRepository,
      inject: [Connection]
    }
  ]
})
export class UserModule {
}
