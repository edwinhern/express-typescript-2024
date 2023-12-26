import { ServiceResponse, User } from '../../models';
import { IRepository } from '../../repositories';
import { logger } from '../../server';
import { IService } from '../interfaces/service.interface';

export class UserService implements IService<User> {
  private readonly _repository: IRepository<User>;

  constructor(repository: IRepository<User>) {
    this._repository = repository;
  }

  public async findAll(): Promise<ServiceResponse<User[]>> {
    try {
      const users = await this._repository.findAllAsync();
      return new ServiceResponse<User[]>(true, 'Users found.', users);
    } catch (ex) {
      logger.error(ex);
      return new ServiceResponse<User[]>(false, 'Error finding all users.', [], ex);
    }
  }

  public async findById(id: number): Promise<ServiceResponse<User>> {
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
