import { ServiceResponse } from '~/common/models/serviceResponse';
import { User } from '~/modules/user/userModel';
import { IUserRepository } from '~/modules/user/userRepository';
import { logger } from '~/root/server';

export interface IUserService {
  findAll(): Promise<ServiceResponse<User[] | null>>;
  findById(id: number): Promise<ServiceResponse<User | null>>;
}

export class UserService implements IUserService {
  private readonly _repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this._repository = repository;
  }

  public async findAll() {
    try {
      const users = await this._repository.findAllAsync();
      return new ServiceResponse<User[]>(true, 'Users found.', users);
    } catch (ex) {
      logger.error(ex);
      return new ServiceResponse<User[]>(false, 'Error finding all users.', [], ex);
    }
  }

  public async findById(id: number) {
    try {
      const user = await this._repository.findByIdAsync(id);
      if (!user) return new ServiceResponse<User>(false, 'User not found.', null);
      return new ServiceResponse<User>(true, 'User found.', user);
    } catch (ex) {
      logger.error(ex);
      return new ServiceResponse<User>(false, 'Error finding user.', null, ex);
    }
  }
}
