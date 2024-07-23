import type { Request, RequestHandler, Response } from "express";

import { userServiceInstance } from "@/api/user/userService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class UserController {
  public getUsers: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await userServiceInstance.findAll();
    return handleServiceResponse(serviceResponse, res);
  };

  public getUser: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id as string, 10);
    const serviceResponse = await userServiceInstance.findById(id);
    return handleServiceResponse(serviceResponse, res);
  };
}

export const userController = new UserController();
