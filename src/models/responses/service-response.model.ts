export class ServiceResponse<T> {
  success: boolean;
  message: string;
  responseObject: T | null;
  errors?: unknown;

  constructor(success: boolean, message: string, responseObject: T | null, errors?: unknown) {
    this.success = success;
    this.message = message;
    this.responseObject = responseObject;
    this.errors = errors;
  }
}
