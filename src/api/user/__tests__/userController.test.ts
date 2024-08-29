import { StatusCodes } from "http-status-codes";
import request from "supertest";

import type { IUserResponse, IUsersResponse, User } from "@/api/user/userModel";
import { users } from "@/api/user/userRepository";
import type { ServiceResponse } from "@/common/models/serviceResponse";
import { app } from "@/server";

describe("User API Endpoints", () => {
  describe("GET /api/user", () => {
    it("should return a list of users", async () => {
      // Act
      const response = await request(app).get("/api/user");
      const responseBody: IUsersResponse = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Users found");
      expect(responseBody.responseObject?.length).toEqual(users.length);
      responseBody.responseObject?.forEach((user, index) => compareUsers(users[index] as User, user));
    });
  });

  describe("GET /api/user/:id", () => {
    it("should return a user for a valid ID", async () => {
      // Arrange
      const testId = 1;
      const expectedUser = users.find((user) => user.id === testId) as User;

      // Act
      const response = await request(app).get(`/api/user/${testId}`);
      const responseBody: IUserResponse = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("User found");
      if (!expectedUser) throw new Error("Invalid test data: expectedUser is undefined");
      compareUsers(expectedUser, responseBody.responseObject as User);
    });

    it("should return a not found error for non-existent ID", async () => {
      // Arrange
      const testId = Number.MAX_SAFE_INTEGER;

      // Act
      const response = await request(app).get(`/api/user/${testId}`);
      const responseBody: ServiceResponse = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("User not found");
      expect(responseBody.responseObject).toBeNull();
    });

    it("should return a bad request for invalid ID format", async () => {
      // Act
      const invalidInput = "abc";
      const response = await request(app).get(`/api/user/${invalidInput}`);
      const responseBody: ServiceResponse = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toEqual("Validation Failed");
      expect(responseBody.responseObject).toEqual({
        userId: {
          message: "invalid float number",
          value: invalidInput,
        },
      });
    });
  });
});

function compareUsers(mockUser: User, responseUser: User) {
  if (!mockUser || !responseUser) {
    throw new Error("Invalid test data: mockUser or responseUser is undefined");
  }

  expect(responseUser.id).toEqual(mockUser.id);
  expect(responseUser.name).toEqual(mockUser.name);
  expect(responseUser.email).toEqual(mockUser.email);
  expect(responseUser.age).toEqual(mockUser.age);
  expect(new Date(responseUser.createdAt)).toEqual(mockUser.createdAt);
  expect(new Date(responseUser.updatedAt)).toEqual(mockUser.updatedAt);
}
