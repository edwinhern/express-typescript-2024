import { Request, Response } from 'express';

import { handleServiceResponse } from '@common/middleware/responseHandler';
import { ServiceResponse } from '@common/models/serviceResponse';

export interface IHealthCheckController {
  status(_: Request, response: Response): void;
}

export class HealthCheckController implements IHealthCheckController {
  status = (_: Request, response: Response) => {
    const serviceResponse = new ServiceResponse(true, 'Service is healthy.', null);
    handleServiceResponse(serviceResponse, response);
  };
}
