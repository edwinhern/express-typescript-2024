import { User } from '@modules/user/userModel';

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 42, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, name: 'Bob', email: 'bob@example.com', age: 21, createdAt: new Date(), updatedAt: new Date() },
];

export const userRepository = {
  findByIdAsync: async (id: number): Promise<User | null> => {
    return users.find((user) => user.id === id) || null;
  },

  findAllAsync: async (): Promise<User[]> => {
    return users || [];
  },
};
