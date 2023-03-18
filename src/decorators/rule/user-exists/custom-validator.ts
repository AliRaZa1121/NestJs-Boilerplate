import { Injectable, Inject } from "@nestjs/common";
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { UsersService } from "../../../users/users.service";

@ValidatorConstraint({ name: "UserExists", async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
  constructor(@Inject(UsersService) private _userService: UsersService) {}

  async validate(value: string, args: ValidationArguments) {
    const property = args.property;
    const validation = {};
    validation[property] = value;
    const query = await this._userService.checkIfUserExists(validation);
    if (query) {
      return false;
    } else {
      return true;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return "($value) is already exists!";
  }
}
