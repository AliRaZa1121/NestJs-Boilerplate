import { Roles } from "../roles/entities/roles.entity";
import { ResponseRolesInterface } from "../utilities/interface";

export const rolesListingMapper = function (roles: Roles[] = []) {
  if (roles.length > 0) {
    return roles.map((role) => {
      const modifyRole: ResponseRolesInterface = {
        attributes: {
          name: role?.name,
          slug: role?.slug,
          createdAt: role?.created_at,
          updatedAt: role?.updated_at,
        },
        id: role?.id,
      };
      return modifyRole;
    });
  }
  return roles;
};

export const roleSingleMapper = function (role: Roles) {
  const data: ResponseRolesInterface = {
    attributes: {
      name: role?.name,
      slug: role?.slug,
      createdAt: role?.created_at,
      updatedAt: role?.updated_at,
    },
    id: role?.id,
  };
  return data;
};
