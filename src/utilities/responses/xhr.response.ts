export interface Responose {
  error?: string;
  message?: string;
  statusCode: number;
  schema: Object;
}

export const BAD_REQUEST: Responose = {
  error: "400 Bad Request, invalid request data",
  statusCode: 400,
  schema: {
    properties: {
      statusCode: { type: "integer" },
      message: { type: "string" },
    },
  },
};

export const SERVER_ERROR: Responose = {
  error: "500 internal server error",
  statusCode: 500,
  schema: {
    properties: {
      statusCode: { type: "integer" },
      message: { type: "string" },
    },
  },
};

export const SUCCESS_RESPONSE = {
  statusCode: 200,
  message: "Success Response",
  schema: {
    properties: {
      success: { type: "boolean" },
      message: { type: "string" },
      data: { type: "object" },
    },
  },
};

export const UNAUTHORIZED_RESPONSE: Responose = {
  error: "401 Unauthorized",
  statusCode: 401,
  schema: {
    properties: {
      success: { type: "boolean" },
      message: { type: "string" },
      data: { type: "object" },
    },
  },
};
