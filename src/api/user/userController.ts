import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Controller, Get, HttpCode, Params, Req, Res, UseBefore } from 'routing-controllers';
import Container from 'typedi';

import { GetUserSchema } from '@/api/user/userModel';
import { UserService } from '@/api/user/userService';
import { handleServiceResponse, validationMiddleware } from '@/common/utils/httpHandlers';

@Controller('/users')
export default class UserController {
  private userService = Container.get(UserService);

  @Get()
  @HttpCode(StatusCodes.OK)
  async getUsers(@Req() _request: Request, @Res() response: Response) {
    const serviceResponse = await this.userService.findAll();
    return handleServiceResponse(serviceResponse, response);
  }

  @Get('/:id')
  @HttpCode(StatusCodes.OK)
  @UseBefore(validationMiddleware(GetUserSchema, 'params'))
  async getUserById(@Params({ validate: false, required: true }) request: GetUserSchema, @Res() response: Response) {
    const serviceResponse = await this.userService.findById(request.id);
    return handleServiceResponse(serviceResponse, response);
  }
}
