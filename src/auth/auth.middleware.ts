import { HttpException, Injectable, NestMiddleware } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma/prisma.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {
  }

  async use(req: any, res: any, next: () => void) {
    const username = req.headers["x-username"] as number | undefined | null;
    if (!username) throw new HttpException("Unauthorized", 401);

    const user = await
      this.prismaService.user.findUnique({
        where: {
          id: Number(username)
        }
      });

    if (user) {
      req.user = user;
      next();
    } else {
      throw new HttpException("Unauthorized", 401);
    }

  }
}
