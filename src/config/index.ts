import dotenv from 'dotenv';
import { bool, cleanEnv, host, num, port, str } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
  HOST: host(),
  PORT: port(),
  CORS_ORIGIN: str(),
  CORS_CREDENTIALS: bool(),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num(),
  COMMON_RATE_LIMIT_WINDOW_MS: num(),
  ROUTE_PREFIX: str(),
});
