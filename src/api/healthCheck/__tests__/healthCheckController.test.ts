import { StatusCodes } from 'http-status-codes';
import supertest from 'supertest';

import { ServiceResponse } from '@/common/models/serviceResponse';
import { server } from '@/server';

const request = supertest(server.app);

describe('Health Check API endpoints', () => {
  it('GET / - success', async () => {
    const response = await request.get('/api/health-check');
    const result: ServiceResponse = response.body;

    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(result.success).toBeTruthy();
    expect(result.responseObject).toBeNull();
    expect(result.message).toEqual('Service is healthy');
  });
});
