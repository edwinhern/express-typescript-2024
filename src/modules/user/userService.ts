import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@common/models/serviceResponse';
import { User } from '@modules/user/userModel';
import * as userRepository from '@modules/user/userRepository';
import { logger } from '@src/server';

// Retrieves all users from the database
export async function findAll(): Promise<ServiceResponse<User[] | null>> {
  try {
    const users = await userRepository.findAllAsync();
    if (!users) {
      return new ServiceResponse(ResponseStatus.Failed, 'No Users found', null, StatusCodes.NOT_FOUND);
    }
    return new ServiceResponse<User[]>(ResponseStatus.Success, 'Users found', users, StatusCodes.OK);
  } catch (ex) {
    const errorMessage = `Error finding all users: $${(ex as Error).message}`;
    logger.error(errorMessage);
    return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

// Retrieves a single user by their ID
export async function findById(id: number): Promise<ServiceResponse<User | null>> {
  try {
    const user = await userRepository.findByIdAsync(id);
    if (!user) {
      return new ServiceResponse(ResponseStatus.Failed, 'User not found', null, StatusCodes.NOT_FOUND);
    }
    return new ServiceResponse<User>(ResponseStatus.Success, 'User found', user, StatusCodes.OK);
  } catch (ex) {
    const errorMessage = `Error finding user with id ${id}:, ${(ex as Error).message}`;
    logger.error(errorMessage);
    return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
