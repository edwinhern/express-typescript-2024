import { env } from '@common/utils/envConfig';
import { app, logger } from '@src/server';

const port = env.PORT;

const server = app.listen(port, () => {
  const { NODE_ENV, HOST } = env;
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${port}`);
});

const onCloseSignal = () => {
  logger.info('sigint received, shutting down');
  server.close(() => {
    logger.info('server closed');
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);
