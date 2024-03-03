import express from 'express';
import { StatusCodes } from 'http-status-codes';
import request, { Response } from 'supertest';

import errorHandler from '@/common/middleware/errorHandler'; // Assuming you have this
import requestLogger from '@/common/middleware/requestLogger';

describe('Request Logger Middleware', () => {
  const app = express();

  app.use(requestLogger());

  app.get('/success', (req, res) => {
    res.status(StatusCodes.OK).send('Success');
  });

  app.get('/redirect', (req, res) => {
    res.redirect('/success');
  });

  app.get('/error', () => {
    throw new Error('Test error');
  });

  app.use(errorHandler());

  it('should log successful requests correctly', async () => {
    const response = await request(app).get('/success');
    expect(response.status).toBe(StatusCodes.OK);
  });

  it('should log re-directions correctly', async () => {
    const response = await request(app).get('/redirect');
    expect(response.status).toBe(StatusCodes.MOVED_TEMPORARILY);
  });

  it('should log errors correctly', async () => {
    const response = await request(app).get('/error');
    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('should log 404 for unknown routes', async () => {
    const response = await request(app).get('/unknown');
    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });

  it('should check existing request id', async () => {
    const requestId = 'test-request-id';
    const response: Response = await request(app).get('/success').set('X-Request-Id', requestId);
    expect(response.status).toBe(StatusCodes.OK);
  });
});
