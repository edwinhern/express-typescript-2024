import { ServiceResponse } from '@common/models/serviceResponse';
import { User } from '@modules/user/userModel';
import { userRepository } from '@modules/user/userRepository';
import { logger } from '@src/server';

export const userService = {
  // Retrieves all users from the database
  findAll: async (): Promise<ServiceResponse<User[] | null>> => {
    try {
      const users = await userRepository.findAllAsync();
      return new ServiceResponse<User[]>(true, 'Users found.', users);
    } catch (ex) {
      logger.error(ex);
      return new ServiceResponse<User[]>(false, 'Error finding all users.', [], ex);
    }
  },

  // Retrieves a single user by their ID
  findById: async (id: number): Promise<ServiceResponse<User | null>> => {
    try {
      const user = await userRepository.findByIdAsync(id);
      if (!user) {
        return new ServiceResponse<User>(false, 'User not found.', null);
      }
      return new ServiceResponse<User>(true, 'User found.', user);
    } catch (ex) {
      logger.error(`Error finding user with id ${id}:`, ex);
      return new ServiceResponse<User>(false, 'Error finding user.', null, ex);
    }
  },
};
