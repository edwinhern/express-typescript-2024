import express, { Request, Response, Router } from 'express';

import { UserController } from '../controllers';
import { User } from '../models';
import { IRepository, UserRepository } from '../repositories';
import { IService } from '../services/interfaces/service.interface';
import { UserService } from '../services/user/user.service';

const router: Router = express.Router();
const userRepository: IRepository<User> = new UserRepository();
const userService: IService<User> = new UserService(userRepository);
const controller: UserController = new UserController(userService);

router.get('/', async (request: Request, response: Response) => {
  await controller.getAllUsers(request, response);
});

router.get('/:id', async (request: Request, response: Response) => {
  const id = parseInt(request.params.id as string, 10);
  await controller.getUserById(id, response);
});

export const usersRouter: Router = router;
