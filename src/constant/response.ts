export interface Response {
  success: boolean;
  message: string;
  statusCode: number;
  data: any;
}

export const ResponseObj = {
  success: true,
  statusCode: 0,
  message: '',
  data: null,
};

export const BAD_REQUEST = {
  description: '400 Bad Request, invalid request data',
  status: 400,
  schema: {
    properties: {
      statusCode: { type: 'integer' },
      message: { type: 'string' },
    },
  },
};

export const SERVER_ERROR = {
  description: '500 internal server error',
  status: 500,
  schema: {
    properties: {
      statusCode: { type: 'integer' },
      message: { type: 'string' },
    },
  },
};

export const SUCCESS_RESPONSE = {
  status: 200,
  description: 'Success Response',
  schema: {
    properties: {
      success: { type: 'boolean' },
      message: { type: 'string' },
      data: { type: 'object' },
    },
  },
};

export const UNAUTHORIZED_RESPONSE = {
  description: '401 Unauthorized',
  status: 401,
  schema: {
    properties: {
      statusCode: { type: 'integer' },
      message: { type: 'string' },
    },
  },
};
