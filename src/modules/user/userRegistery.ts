import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import { ServiceResponseSchema } from '@common/models/serviceResponse';
import { GetUserSchema, UserSchema } from '@modules/user/userModel';

const userRegistry = new OpenAPIRegistry();

// Register schemas
userRegistry.register('User', UserSchema);
userRegistry.register('GetUser', GetUserSchema);

// Define and register user API Routes
userRegistry.registerPath({
  method: 'get',
  path: '/users',
  tags: ['User'],
  description: 'Retrieve all users',
  summary: 'Get Users',
  responses: {
    [StatusCodes.OK]: {
      description: 'List of users',
      content: {
        'application/json': {
          schema: ServiceResponseSchema(z.array(UserSchema)),
        },
      },
    },
    [StatusCodes.NOT_FOUND]: {
      description: 'User not found',
    },
    [StatusCodes.INTERNAL_SERVER_ERROR]: {
      description: 'Internal server error',
    },
  },
});

userRegistry.registerPath({
  method: 'get',
  path: '/users/{id}',
  tags: ['User'],
  description: 'Retrieve a single user by ID',
  summary: 'Get User by ID',
  request: {
    params: GetUserSchema.shape.params,
  },
  responses: {
    [StatusCodes.OK]: {
      description: 'User data',
      content: {
        'application/json': {
          schema: ServiceResponseSchema(UserSchema),
        },
      },
    },
    [StatusCodes.NOT_FOUND]: {
      description: 'User not found',
    },
    [StatusCodes.INTERNAL_SERVER_ERROR]: {
      description: 'Internal server error',
    },
    [StatusCodes.BAD_REQUEST]: {
      description: 'Bad request',
    },
  },
});

export { userRegistry };
