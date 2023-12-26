import { User } from '../../models';
import { IRepository } from '../interfaces/repository.interface';

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 42, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, name: 'Bob', email: 'bob@example.com', age: 21, createdAt: new Date(), updatedAt: new Date() },
];

export class UserRepository implements IRepository<User> {
  public async findByIdAsync(id: number): Promise<User | null> {
    return users.find((user) => user.id === id) || null;
  }

  public async findAllAsync(): Promise<User[]> {
    return users || [];
  }
}
