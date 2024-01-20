import express, { Request, Response, Router } from 'express';

import { handleServiceResponse, validateRequest } from '@common/utils/httpHandlers';
import * as userService from '@modules/user/userService';

import { GetUserSchema } from './userModel';

export const userRouter: Router = (() => {
  const router = express.Router();

  router.get('/', async (_req: Request, res: Response) => {
    const serviceResponse = await userService.findAll();
    handleServiceResponse(serviceResponse, res);
  });

  router.get('/:id', validateRequest(GetUserSchema), async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string, 10);
    const serviceResponse = await userService.findById(id);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
