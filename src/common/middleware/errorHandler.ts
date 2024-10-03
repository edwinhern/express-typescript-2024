import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { ValidateError } from "tsoa";

import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";

export function notFoundHandler(_req: Request, res: Response) {
  res.status(StatusCodes.NOT_FOUND).json({ message: "Not Found" });
}

export function errorHandlers(err: unknown, req: Request, res: Response, next: NextFunction): void {
  logger.error("Error occurred:", err);

  if (isValidateError(err)) {
    handleValidationError(err, req, res);
  } else if (err instanceof Error) {
    handleGenericError(res);
  } else {
    handleUnknownError(res);
  }

  next();
}

function isValidateError(error: unknown): error is ValidateError {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    error.name === "ValidateError" &&
    "fields" in error
  );
}

function handleValidationError(err: ValidateError, req: Request, res: Response): void {
  logger.warn(`Validation Error for ${req.path}:`, err.fields);
  const validateErrorRes = ServiceResponse.failure("Validation Failed", err.fields);
  res.status(StatusCodes.BAD_REQUEST).json(validateErrorRes);
}

function handleGenericError(res: Response): void {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
  });
}

function handleUnknownError(res: Response): void {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Unknown Error Occurred",
  });
}
