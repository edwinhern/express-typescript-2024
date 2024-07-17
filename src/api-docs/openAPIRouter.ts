import express, { type Request, type Response, type Router } from "express";
import swaggerUi from "swagger-ui-express";

import { generateOpenAPIDocument } from "@/api-docs/openAPIDocumentGenerator";

export const openAPIRouter: Router = (() => {
  const router = express.Router();
  const openAPIDocument = generateOpenAPIDocument();

  router.get("/swagger.json", (_req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(openAPIDocument);
  });

  router.use("/", swaggerUi.serve, swaggerUi.setup(openAPIDocument));

  return router;
})();
