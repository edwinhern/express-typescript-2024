import { StatusCodes } from 'http-status-codes';
import { Controller, Get } from 'routing-controllers';

import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';

@Controller('/health-check')
export class HealthCheckController {
  @Get('/')
  async getHealth() {
    return new ServiceResponse(ResponseStatus.Success, 'Service is healthy', null, StatusCodes.OK);
  }
}
