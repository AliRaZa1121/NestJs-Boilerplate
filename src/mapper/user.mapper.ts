import { Roles } from "src/roles/entities/roles.entity";
import { User } from "../users/entities/user.entity";
import { ResponseUserInterface } from "src/utilities/responses/response-interface";
import { ResponseLoginInterface } from "../utilities/interface";

export const loginMapper = (payload: { token: any; user: any }) => {
  const { user, token } = payload;
  const data: ResponseLoginInterface = {
    token: token,
    id: user.id,
    attributes: {
      firstName: user?.first_name,
      lastName: user?.last_name,
      email: user?.email,
      status: user?.status,
      createdAt: user?.created_at,
      updatedAt: user?.updated_at,
      role: user.role_id == null ? null : roleSingleMapper(user.role_id),
    },
  };
  return data;
};

export const singleUserListingMapper = function (user: User) {
  const userResponse: ResponseUserInterface = {
    attributes: {
      firstName: user?.first_name,
      lastName: user?.last_name,
      email: user?.email,
      status: user?.status,
      createdAt: user?.created_at,
      updatedAt: user?.updated_at,
      role: user.role == null ? null : roleSingleMapper(user.role),
    },
    id: user.id,
  };
  return userResponse;
};

export const usersListingMapper = function (users: User[] = []) {
  if (users.length > 0) {
    return users.map((user) => {
      const modifyUser: ResponseUserInterface = {
        attributes: {
          firstName: user?.first_name,
          lastName: user?.last_name,
          email: user?.email,
          status: user?.status,
          createdAt: user?.created_at,
          updatedAt: user?.updated_at,
        },
        id: user?.id,
      };
      return modifyUser;
    });
  }
  return users;
};

export const roleSingleMapper = function (role: Roles) {
  return {
    id: role?.id,
    name: role?.name,
    slug: role?.slug,
  };
};

export const mapUserInformation = function (user: User | any) {
  return {
    id: user?.id,
    name:
      user.first_name && user.last_name
        ? `${user.first_name} ${user.last_name}`
        : null,
    email: user?.email,
  };
};
