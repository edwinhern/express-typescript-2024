import { Request, Response } from 'express';

import { User } from '../../models';
import { IService } from '../../services';

export class UserController {
  private readonly _service: IService<User>;

  constructor(service: IService<User>) {
    this._service = service;
  }

  public async getAllUsers(_: Request, response: Response) {
    const serviceResponse = await this._service.findAll();

    if (!serviceResponse.success) {
      return response.status(500).send(serviceResponse);
    }

    return response.status(200).send(serviceResponse);
  }

  public async getUserById(id: number, response: Response) {
    const serviceResponse = await this._service.findById(id);

    if (!serviceResponse.success) {
      return response.status(500).send(serviceResponse);
    }

    return response.status(200).send(serviceResponse);
  }
}
