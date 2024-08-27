import { logger } from "@/server";
import { ValidateError } from "@tsoa/runtime";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ServiceResponse } from "../models/serviceResponse";

export function notFoundHandler(_req: Request, res: Response) {
  res.status(StatusCodes.NOT_FOUND).send({ message: "Not Found" });
}

export function errorHandlers(err: unknown, req: Request, res: Response, next: NextFunction): Response | void {
  res.locals.err = err;

  if (err instanceof ValidateError) {
    logger.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    const ValidateErrorRes = ServiceResponse.failure("Validation Failed", err.fields);
    return res.status(StatusCodes.BAD_REQUEST).json(ValidateErrorRes);
  }
  if (err instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }

  next();
}
