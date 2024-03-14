import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { Roles } from "./roles.decorator";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    // private roles: string[],
    private reflector: Reflector
  ) {
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: string[] = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    } else {
      const user = context.switchToHttp().getRequest().user;
      return roles.indexOf(user.role) != -1;
    }
  }

  // canActivate(
  //   context: ExecutionContext
  // ): boolean | Promise<boolean> | Observable<boolean> {
  //   const user = context.switchToHttp().getRequest().user;
  //   return this.roles.indexOf(user.role) != -1;
  // }
}
