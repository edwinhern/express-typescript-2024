import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { GetUserSchema, UserSchema } from "@/api/user/userModel";
import { userServiceInstance } from "@/api/user/userService";
import { handleServiceResponse, validateRequest } from "@/common/utils/httpHandlers";

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

userRegistry.register("User", UserSchema);

userRegistry.registerPath({
  method: "get",
  path: "/users",
  tags: ["User"],
  responses: createApiResponse(z.array(UserSchema), "Success"),
});

userRouter.get("/", async (_req: Request, res: Response) => {
  const serviceResponse = await userServiceInstance.findAll();
  return handleServiceResponse(serviceResponse, res);
});

userRegistry.registerPath({
  method: "get",
  path: "/users/{id}",
  tags: ["User"],
  request: { params: GetUserSchema.shape.params },
  responses: createApiResponse(UserSchema, "Success"),
});

userRouter.get("/:id", validateRequest(GetUserSchema), async (req: Request, res: Response) => {
  const id = Number.parseInt(req.params.id as string, 10);
  const serviceResponse = await userServiceInstance.findById(id);
  return handleServiceResponse(serviceResponse, res);
});
