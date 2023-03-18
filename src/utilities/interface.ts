///// Users Module

import { RefreshTokenStatus, RefreshTokenType } from "./enums";

export interface JwtPayload {
  email: string;
  family_name: string;
  given_name: string;
  sub: number;
}

export interface ResponseLoginInterface {
  attributes: {
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    role: Object;
    createdAt: Date;
    updatedAt: Date;
  };
  id: number;
  token: string;
}

export interface RefreshTokenWhereClause {
  id?: number;
  status?: RefreshTokenStatus;
  user_id?: number;
  token?: string;

  type?: RefreshTokenType;
}

export interface RefreshTokenCreate {
  type: RefreshTokenType;
  user_id: number;
}

export interface ResponseMediaInterface {
  attributes: {
    type: string;
    path: string;
    createdAt: Date;
    updatedAt: Date;
  };
  id: number;
}

export interface PaginationInterface {
  page: number;
  take: number;
  total: number;
}

export interface ResponseRolesInterface {
  attributes: {
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
  };
  id: number;
}

export interface ResponseBatchInterface {
  attributes: {
    name: string;
    description: string;
    githubLink: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    studentsInformation?: Array<Object>;
  };
  id: number;
}

export interface ListingDataFromRepository {
  data: any[];
  take: number;
  total: number;
  page: number;
}
