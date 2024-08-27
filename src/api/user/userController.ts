import { Controller, Get, Path, Route, SuccessResponse, Tags } from "@tsoa/runtime";
import { StatusCodes } from "http-status-codes";

import { UserService } from "@/api/user/userService";

@Route("user")
@Tags("Users")
export class UserController extends Controller {
  private userService: UserService;

  constructor(userService = new UserService()) {
    super();
    this.userService = userService;
  }

  @Get()
  @SuccessResponse(StatusCodes.OK, "Users found")
  public async getUsers() {
    return this.userService.findAll();
  }

  @Get("{userId}")
  @SuccessResponse(StatusCodes.OK, "User found")
  public async getUser(@Path() userId: number) {
    return this.userService.findById(userId);
  }
}
