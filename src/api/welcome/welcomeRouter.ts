import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { HtmlServiceResponse } from "@/common/models/htmlServiceResponse";
import { handleHtmlServiceResponse } from "@/common/utils/httpHandlers";

export const welcomeRegistry = new OpenAPIRegistry();
export const welcomeRouter: Router = express.Router();

welcomeRegistry.registerPath({
  method: "get",
  path: "/",
  tags: ["Welcome"],
  responses: createApiResponse(z.null(), "Success"),
});

welcomeRouter.get("/", (_req: Request, res: Response) => {
  const htmlServiceResponse = HtmlServiceResponse.success("<h1>Welcome to Express Typescript Api</h1>");
  return handleHtmlServiceResponse(htmlServiceResponse, res);
});
