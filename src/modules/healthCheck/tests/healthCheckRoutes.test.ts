import request from 'supertest';

import { ServiceResponse } from '@common/models/serviceResponse';
import { app } from '@src/server';

describe('Health Check API endpoints', () => {
  it('GET / - success', async () => {
    const response = await request(app).get('/health-check');
    const result: ServiceResponse<null> = response.body;

    expect(response.statusCode).toEqual(200);
    expect(result.success).toBeTruthy();
    expect(result.responseObject).toBeNull();
    expect(result.message).toEqual('Service is healthy.');
  });
});
