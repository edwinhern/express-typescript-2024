import express, { Request, Response, Router } from 'express';

import { ServiceResponse } from '@common/models/serviceResponse';
import { handleServiceResponse } from '@common/utils/responseHandler';

export const healthCheckRouter: Router = (() => {
  const router = express.Router();

  router.get('/', (_req: Request, res: Response) => {
    const serviceResponse = new ServiceResponse(true, 'Service is healthy.', null);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
