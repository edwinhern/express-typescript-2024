/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ExpressTemplateService, type TsoaRoute, fetchMiddlewares } from "@tsoa/runtime";
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from "express";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { HealthCheckController } from "./../healthCheck/healthCheckController.js";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from "./../user/userController.js";

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  IHealthCheckResponse: {
    dataType: "refObject",
    properties: {
      success: { dataType: "boolean", required: true },
      message: { dataType: "string", required: true },
      responseObject: { dataType: "enum", enums: [null], required: true },
      statusCode: { dataType: "double", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  User: {
    dataType: "refObject",
    properties: {
      id: { dataType: "double", required: true },
      name: { dataType: "string", required: true },
      email: { dataType: "string", required: true },
      age: { dataType: "double", required: true },
      createdAt: { dataType: "datetime", required: true },
      updatedAt: { dataType: "datetime", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  IUsersResponse: {
    dataType: "refObject",
    properties: {
      success: { dataType: "boolean", required: true },
      message: { dataType: "string", required: true },
      responseObject: {
        dataType: "union",
        subSchemas: [
          { dataType: "array", array: { dataType: "refObject", ref: "User" } },
          { dataType: "enum", enums: [null] },
        ],
        required: true,
      },
      statusCode: { dataType: "double", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  IUserResponse: {
    dataType: "refObject",
    properties: {
      success: { dataType: "boolean", required: true },
      message: { dataType: "string", required: true },
      responseObject: {
        dataType: "union",
        subSchemas: [{ ref: "User" }, { dataType: "enum", enums: [null] }],
        required: true,
      },
      statusCode: { dataType: "double", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {
  noImplicitAdditionalProperties: "silently-remove-extras",
  bodyCoercion: true,
});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################

  app.get(
    "/api/health-check",
    ...fetchMiddlewares<RequestHandler>(HealthCheckController),
    ...fetchMiddlewares<RequestHandler>(HealthCheckController.prototype.getHealthCheck),

    async function HealthCheckController_getHealthCheck(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new HealthCheckController();

        await templateService.apiHandler({
          methodName: "getHealthCheck",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 200,
        });
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/user",
    ...fetchMiddlewares<RequestHandler>(UserController),
    ...fetchMiddlewares<RequestHandler>(UserController.prototype.getUsers),

    async function UserController_getUsers(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new UserController();

        await templateService.apiHandler({
          methodName: "getUsers",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 200,
        });
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/user/:userId",
    ...fetchMiddlewares<RequestHandler>(UserController),
    ...fetchMiddlewares<RequestHandler>(UserController.prototype.getUser),

    async function UserController_getUser(request: ExRequest, response: ExResponse, next: any) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        userId: { in: "path", name: "userId", required: true, dataType: "double" },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({ args, request, response });

        const controller = new UserController();

        await templateService.apiHandler({
          methodName: "getUser",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 200,
        });
      } catch (err) {
        return next(err);
      }
    },
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
