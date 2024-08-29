import { StatusCodes } from "http-status-codes";
import request from "supertest";

import type { IHealthCheckResponse } from "@/api/healthCheck/healthCheckController";
import { app } from "@/server";

describe("Health Check API endpoints", () => {
  it("GET / - success", async () => {
    const response = await request(app).get("/api/health-check");
    const result: IHealthCheckResponse = response.body;

    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(result.success).toBeTruthy();
    expect(result.responseObject).toBeNull();
    expect(result.message).toEqual("Service is healthy");
  });
});
