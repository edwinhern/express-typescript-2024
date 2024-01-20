import _ from 'lodash';

export enum ResponseStatus {
  Success,
  Failed,
}

export class ServiceResponse<T = null> {
  success: boolean;
  message: string;
  responseObject: T;
  statusCode: number;

  constructor(success: ResponseStatus, message: string, responseObject: T, statusCode: number) {
    this.success = _.isEqual(success, ResponseStatus.Success);
    this.message = message;
    this.responseObject = responseObject;
    this.statusCode = statusCode;
  }
}
