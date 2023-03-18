import { ErrorApiInterface } from "../utilities/responses/wrapper.response";
import { errorApiWrapper } from "../utilities/responses/wrapper.service";
import { HttpException } from "@nestjs/common";

export async function sendError(error): Promise<ErrorApiInterface> {
  console.error(error);
  throw new HttpException(
    errorApiWrapper(error.message, error.status),
    error.status
  );
}
