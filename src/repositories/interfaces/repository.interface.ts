export interface IRepository<T> {
  findAllAsync(): Promise<T[]>;
  findByIdAsync(id: number): Promise<T | null>;
}
