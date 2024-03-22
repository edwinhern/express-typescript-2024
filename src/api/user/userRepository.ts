import { Service } from 'typedi';

import { User } from '@/api/user/userModel';

export const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 42, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, name: 'Bob', email: 'bob@example.com', age: 21, createdAt: new Date(), updatedAt: new Date() },
];

@Service()
export class UserRepository {
  public async findAllAsync(): Promise<User[]> {
    return users;
  }

  public async findByIdAsync(id: number): Promise<User | null> {
    return users.find((user) => user.id === id) || null;
  }
}
