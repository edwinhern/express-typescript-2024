import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export class HtmlServiceResponse {
  readonly html: string;
  readonly statusCode: number;

  private constructor(html: string, statusCode: number) {
    this.html = html;
    this.statusCode = statusCode;
  }

  static success(html: string, statusCode: number = StatusCodes.OK) {
    return new HtmlServiceResponse(html, statusCode);
  }

  static failure(html: string, statusCode: number = StatusCodes.BAD_REQUEST) {
    return new HtmlServiceResponse(html, statusCode);
  }
}

export const HtmlServiceResponseSchema = () =>
  z.object({
    html: z.string(),
    statusCode: z.number(),
  });
