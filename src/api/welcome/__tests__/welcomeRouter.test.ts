import { StatusCodes } from "http-status-codes";
import request from "supertest";

import { app } from "@/bin/server";

describe("Welcome API endpoints", () => {
  it("GET / - success", async () => {
    const response = await request(app).get("/");
    const result: string = response.text;

    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(result).toEqual("<h1>Welcome to Express Typescript Api</h1>");
  });
});
