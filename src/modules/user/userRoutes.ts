import express, { Router } from 'express';

import { UserController } from './userController';
import { IUserRepository, UserRepository } from './userRepository';
import { IUserService, UserService } from './userService';

const router: Router = express.Router();
const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);
const controller: UserController = new UserController(userService);

router.get('/', controller.getAllUsers);
router.get('/:id', controller.getUserById);

export const usersRouter: Router = router;
