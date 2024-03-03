import express from 'express';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import errorHandler from '@/common/middleware/errorHandler';

describe('Error Handler Middleware', () => {
  const app = express();

  app.get('/error', () => {
    throw new Error('Test error');
  });

  app.get('/next-error', (_req, _res, next) => {
    const error = new Error('Error passed to next()');
    next(error);
  });

  app.use(errorHandler());

  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/unknown');
    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });

  it('should handle thrown errors with 500 status code', async () => {
    const response = await request(app).get('/error');
    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('should handle errors passed to next() with 500 status code', async () => {
    const response = await request(app).get('/next-error');
    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
