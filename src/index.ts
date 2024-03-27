import { logger, server } from '@/server';

const serverInstance = server.start();

const onCloseSignal = () => {
  logger.info('sigint received, shutting down');
  serverInstance.close(() => {
    logger.info('server closed');
    process.exit();
  });

  setTimeout(() => {
    logger.warn('Forced shutdown');
    process.exit(1); // Forced exit
  }, 10000).unref(); // Unref to not block event loop
};

process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);
