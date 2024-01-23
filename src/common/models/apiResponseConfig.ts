import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

export type ApiResponseConfig = {
  schema: z.ZodTypeAny;
  description: string;
  statusCode: StatusCodes;
};
