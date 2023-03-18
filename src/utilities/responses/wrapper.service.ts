import { HttpStatus } from "@nestjs/common";
import { ErrorApiInterface, SuccessApiInterface } from "./wrapper.response";
import { PaginationInterface } from "../interface";

export const successApiWrapper = function (
  data = null,
  message = null,
  statusCode = 200
) {
  const SuccessApiInterface: SuccessApiInterface = {
    message: message,
    statusCode: statusCode,
    data: data,
  };
  return SuccessApiInterface;
};

export function successApiWrapperPaginate(
  data: any[],
  pagination: PaginationInterface,
  statusCode = 200
) {
  const { page, take, total } = pagination;
  const lastPage = Math.ceil(total / take);
  const nextPage = page + 1 > lastPage ? null : page + 1;
  const prevPage = page - 1 < 1 ? null : page - 1;
  const SuccessApiInterface: SuccessApiInterface = {
    data: data,
    statusCode: statusCode,
    totalCount: total,
    currentPage: page,
    nextPage: nextPage,
    prevPage: prevPage,
    lastPage: lastPage,
  };
  return SuccessApiInterface;
}

export const errorApiWrapper = function (
  error: string,
  statusCode = HttpStatus.INTERNAL_SERVER_ERROR
) {
  const ErrorApiInterface: ErrorApiInterface = {
    error: error,
    statusCode: statusCode,
  };
  return ErrorApiInterface;
};
