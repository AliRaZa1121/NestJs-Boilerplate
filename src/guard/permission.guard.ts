import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
  Inject,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UsersService } from "src/users/users.service";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<string[]>(
      "permissions",
      context.getHandler()
    );
    if (!permissions) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    return true;
  }
}
