import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import {
  Injectable,
  HttpException,
  HttpStatus,
  createParamDecorator,
  ExecutionContext,
} from "@nestjs/common";
import { UsersService } from "../../users.service";
import { User } from "../../entities/user.entity";
import { JwtPayload } from "../../../utilities/interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      secretOrKey: "topSecret51",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.userService.validateUser(payload.sub);
    if (!user) {
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
