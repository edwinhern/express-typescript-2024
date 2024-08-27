import { Controller, Get, Route, SuccessResponse, Tags } from "@tsoa/runtime";
import { StatusCodes } from "http-status-codes";

import { ServiceResponse } from "@/common/models/serviceResponse";

export interface IHealthCheckResponse extends ServiceResponse<null> {}

@Route("health-check")
@Tags("Health Check")
export class HealthCheckController extends Controller {
  @Get()
  @SuccessResponse(StatusCodes.OK, "Service is healthy")
  public async getHealthCheck(): Promise<IHealthCheckResponse> {
    return ServiceResponse.success("Service is healthy", null);
  }
}
