import { User } from './userModel';

export interface IUserRepository {
  findAllAsync(): Promise<User[]>;
  findByIdAsync(id: number): Promise<User | null>;
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 42, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, name: 'Bob', email: 'bob@example.com', age: 21, createdAt: new Date(), updatedAt: new Date() },
];

export class UserRepository implements IUserRepository {
  public async findByIdAsync(id: number) {
    return users.find((user) => user.id === id) || null;
  }

  public async findAllAsync() {
    return users || [];
  }
}
