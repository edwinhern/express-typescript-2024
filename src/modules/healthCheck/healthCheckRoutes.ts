import express, { Router } from 'express';

import { HealthCheckController } from './healthCheckController';

const router: Router = express.Router();
const controller: HealthCheckController = new HealthCheckController();

router.get('/', controller.status);

export const healthCheckRouter: Router = router;
