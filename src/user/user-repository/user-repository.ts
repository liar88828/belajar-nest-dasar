import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma/prisma.service";
import { Logger } from "winston";
import { WINSTON_MODULE_NEST_PROVIDER, WINSTON_MODULE_PROVIDER } from "nest-winston";

@Injectable()
export class UserRepository {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger
  ) {
   this.logger.info("Create User Repository");
  }

  //
  async save(firstName: string, lastName: string) {
    this.logger.info(`Create User with firstname # ${firstName} and lastname # ${lastName}`);
    return this.prismaService.user.create({
      data: {
        first_name: firstName,
        last_name: lastName
      }
    });
  }

  // connection: Connection;

  // save() {
  //   console.info(`save user with connection ${this.connection.getName()}`);
  // }
}

//
// export function createUserRepository(connection: Connection): UserRepository {
//   const repository = new UserRepository();
//   repository.connection = connection;
//   return repository;
// }
