import type { ServiceResponse } from "@/common/models/serviceResponse";

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserResponse extends ServiceResponse<User | null> {}
export interface IUsersResponse extends ServiceResponse<User[] | null> {}
