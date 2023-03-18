import { applyDecorators } from '@nestjs/common';
import {
    ApiUnauthorizedResponse,
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiBearerAuth,
    ApiResponse,
} from '@nestjs/swagger';
import { SUCCESS_RESPONSE, BAD_REQUEST, SERVER_ERROR, UNAUTHORIZED_RESPONSE } from 'src/constant/response';
import { Roles } from '../guard/roles.guard';
import {AllowAny} from "../guard/auth.guard";

export function ApiResponses(isAuth = true, roles = []) {
    if (isAuth && roles.length > 0) {
        return applyDecorators(
            ApiResponse(SUCCESS_RESPONSE),
            ApiBadRequestResponse(BAD_REQUEST),
            ApiCreatedResponse(SUCCESS_RESPONSE),
            ApiInternalServerErrorResponse(SERVER_ERROR),
            ApiUnauthorizedResponse(UNAUTHORIZED_RESPONSE),
            ApiBearerAuth('access-token'),
            Roles(roles),
        );
    } else if (isAuth) {
        return applyDecorators(
            ApiResponse(SUCCESS_RESPONSE),
            ApiBadRequestResponse(BAD_REQUEST),
            ApiCreatedResponse(SUCCESS_RESPONSE),
            ApiInternalServerErrorResponse(SERVER_ERROR),
            ApiUnauthorizedResponse(UNAUTHORIZED_RESPONSE),
            ApiBearerAuth('access-token'),
        );
    } else {
        return applyDecorators(
            ApiResponse(SUCCESS_RESPONSE),
            ApiBadRequestResponse(BAD_REQUEST),
            ApiInternalServerErrorResponse(SERVER_ERROR),
            AllowAny(),
        );
    }
}
