import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { AllowAny } from "src/guard/jwt-auth.guard";
import {
  SUCCESS_RESPONSE,
  BAD_REQUEST,
  SERVER_ERROR,
  UNAUTHORIZED_RESPONSE,
} from "src/utilities/responses/xhr.response";

export function ApiAuthPermission(isAuth = true) {
  if (isAuth) {
    return applyDecorators(
      UseGuards(AuthGuard("jwt")),
      ApiBearerAuth("JWT"),
      ApiOkResponse(SUCCESS_RESPONSE),
      ApiBadRequestResponse(BAD_REQUEST),
      ApiCreatedResponse(SUCCESS_RESPONSE),
      ApiInternalServerErrorResponse(SERVER_ERROR),
      ApiUnauthorizedResponse(UNAUTHORIZED_RESPONSE)
    );
  } else {
    return applyDecorators(
      AllowAny(),
      ApiOkResponse(SUCCESS_RESPONSE),
      ApiBadRequestResponse(BAD_REQUEST),
      ApiCreatedResponse(SUCCESS_RESPONSE),
      ApiInternalServerErrorResponse(SERVER_ERROR),
      ApiUnauthorizedResponse(UNAUTHORIZED_RESPONSE)
    );
  }
}
