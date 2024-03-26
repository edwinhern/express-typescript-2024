import express from 'express';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import errorHandler from '@/common/middleware/errorHandler';

describe('Error Handler Middleware', () => {
  const app = express();

  beforeAll(() => {
    app.get('/error', () => {
      throw new Error('Test error');
    });
    app.get('/next-error', (_req, _res, next) => {
      const error = new Error('Error passed to next()');
      next(error);
    });

    app.get('/undefined-error', (_req, _res, next) => {
      const error = new Error();
      next(error);
    });

    app.use(errorHandler);
    app.use('*', (_req, res) => res.status(StatusCodes.NOT_FOUND).send('Not Found'));
  });

  describe('Handling unknown routes', () => {
    it('returns 404 for unknown routes', async () => {
      const response = await request(app).get('/this-route-does-not-exist');
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.text).toBe('Not Found');
    });
  });

  describe('Handling thrown errors', () => {
    it('handles thrown errors with a 500 status code', async () => {
      const response = await request(app).get('/error');
      expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).toHaveProperty('message', 'Test error');
    });
  });

  describe('Handling errors passed to next()', () => {
    it('handles errors passed to next() with a 500 status code', async () => {
      const response = await request(app).get('/next-error');
      expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).toHaveProperty('message', 'Error passed to next()');
    });
  });

  describe('Handling errors with undefined messages', () => {
    it('handles errors without messages with a 500 status code and a default error message', async () => {
      const response = await request(app).get('/undefined-error');
      expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).toHaveProperty('message', 'An unexpected error occurred');
    });
  });
});
