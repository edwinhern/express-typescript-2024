import { Type } from 'class-transformer';
import { IsPositive } from 'class-validator';

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
}

export class GetUserSchema {
  @Type(() => Number)
  @IsPositive({ message: 'User ID must be a positive number' })
  public id!: number;
}
