import { openAPIRouter } from "@/api-docs/openAPIRouter";
import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter";
import { userRouter } from "@/api/user/userRouter";
import { welcomeRouter } from "@/api/welcome/welcomeRouter";
import express, { type Router } from "express";

export const router: Router = express.Router();

// Home
router.use("/", welcomeRouter);

router.use("/health-check", healthCheckRouter);
router.use("/users", userRouter);

// Swagger UI
router.use("/swagger", openAPIRouter);
