import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma/prisma.service";

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {
    console.info("Create User Repository");
  }
  //
  async save(firstName: string, lastName: string) {
   return  this.prismaService.user.create({
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
