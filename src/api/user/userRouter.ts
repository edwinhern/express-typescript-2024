import { validateOrReject } from 'class-validator';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Controller, Get, HttpCode, Param, Req, Res } from 'routing-controllers';
import Container from 'typedi';

import { GetUserSchema } from '@/api/user/userModel';
import { UserService } from '@/api/user/userService';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

@Controller('/users')
export class UserController {
  public userService = Container.get(UserService);

  @Get('/')
  @HttpCode(StatusCodes.OK)
  async getUsers(@Req() _request: Request, @Res() response: Response) {
    const serviceResponse = await this.userService.findAll();
    return handleServiceResponse(serviceResponse, response);
  }

  @Get('/:id')
  @HttpCode(StatusCodes.OK)
  async getUserById(@Param('id') userId: number, @Res() response: Response) {
    try {
      const request = new GetUserSchema(Number(userId));
      await validateOrReject(request);

      const serviceResponse = await this.userService.findById(request.id);
      return handleServiceResponse(serviceResponse, response);
    } catch (e: any) {
      const message = Object.values(e[0].constraints)[0] as string;
      const serviceResponse = new ServiceResponse(ResponseStatus.Failed, message, null, StatusCodes.BAD_REQUEST);
      return handleServiceResponse(serviceResponse, response);
    }
  }
}
