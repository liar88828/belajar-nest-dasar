import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();
    console.log("Prisma Client has been initialized");
  }

  // agar connection tidak mengantung
  onModuleInit() {
    // throw new Error("Method not implemented.");
    console.info("Connect Prisma");
    this.$connect();
  }

  onModuleDestroy() {
    // throw new Error("Method not implemented.");
    console.info("Disconnect Prisma");
    this.$disconnect();
  }


}
