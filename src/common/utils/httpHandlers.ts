import { plainToInstance } from 'class-transformer';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';

export const handleServiceResponse = (serviceResponse: ServiceResponse<any>, response: Response) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};

const getAllNestedErrors = (error: ValidationError): string[] | string | undefined => {
  if (error.constraints) {
    return Object.values(error.constraints);
  }
  return error.children?.map(getAllNestedErrors).join(',');
};

export const validationMiddleware = (
  type: any,
  value: 'body' | 'query' | 'params' = 'body',
  groups?: string[],
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true
): RequestHandler => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const obj = plainToInstance(type, req[value], { enableImplicitConversion: true });
    try {
      const validatorOptions: ValidatorOptions = { skipMissingProperties, whitelist, forbidNonWhitelisted, groups };
      await validate(obj, validatorOptions).then((errors) => {
        if (errors.length > 0) {
          const message = errors.map(getAllNestedErrors).join(', ');
          throw new Error(message);
        }
      });
      req[value] = obj;
      next();
    } catch (error: any) {
      return handleServiceResponse(
        new ServiceResponse(ResponseStatus.Failed, error.message, null, StatusCodes.BAD_REQUEST),
        _res
      );
    }
  };
};
