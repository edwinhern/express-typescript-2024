import { Request, Response } from 'express';

import { handleServiceResponse } from '@common/utils/responseHandler';
import { IUserService } from '@modules/user/userService';

export class UserController {
  private readonly _service: IUserService;

  constructor(service: IUserService) {
    this._service = service;
  }

  getAllUsers = async (_: Request, response: Response) => {
    const serviceResponse = await this._service.findAll();
    handleServiceResponse(serviceResponse, response);
  };

  getUserById = async (request: Request, response: Response) => {
    const id = parseInt(request.params.id as string, 10);
    const serviceResponse = await this._service.findById(id);
    handleServiceResponse(serviceResponse, response);
  };
}
