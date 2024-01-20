import _ from 'lodash';

export enum ResponseStatus {
  Success,
  Failed,
}

export class ServiceResponse<T> {
  success: boolean;
  message: string;
  responseObject: T | null;
  statusCode: number;

  constructor(success: ResponseStatus, message: string, responseObject: T | null, statusCode: number) {
    this.success = _.isEqual(success, ResponseStatus.Success);
    this.message = message;
    this.responseObject = responseObject;
    this.statusCode = statusCode;
  }
}
