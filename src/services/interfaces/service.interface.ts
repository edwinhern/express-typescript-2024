import { ServiceResponse } from "../../models";

export interface IService<T> {
  findAll(): Promise<ServiceResponse<T[] | null>>;
  findById(id: number): Promise<ServiceResponse<T | null>>;
}
