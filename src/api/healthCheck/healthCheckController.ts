import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Controller, Get, HttpCode, Req, Res } from 'routing-controllers';

import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

@Controller('/health-check')
export class HealthCheckController {
  @Get()
  @HttpCode(StatusCodes.OK)
  checkServiceHealth(@Req() _request: Request, @Res() response: Response) {
    const serviceResponse = new ServiceResponse(ResponseStatus.Success, 'Service is healthy', null, StatusCodes.OK);
    return handleServiceResponse(serviceResponse, response);
  }
}
