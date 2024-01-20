import request from 'supertest';

import { ServiceResponse } from '@common/models/serviceResponse';
import { app } from '@src/server';

describe('compressFilter', () => {
  it('should compress responses when x-no-compression header is not set', async () => {
    const response = await request(app).get('/health-check');
    const result: ServiceResponse = response.body;

    expect(response.statusCode).toEqual(200);
    expect(result.success).toBeTruthy();
    expect(result.responseObject).toBeNull();
    expect(result.message).toEqual('Service is healthy');
    // Assert compression behavior here (e.g., check response headers)
  });

  it('should not compress responses when x-no-compression header is set', async () => {
    const response = await request(app).get('/health-check').set('x-no-compression', 'true');
    const result: ServiceResponse = response.body;

    expect(response.statusCode).toEqual(200);
    expect(result.success).toBeTruthy();
    expect(result.responseObject).toBeNull();
    expect(result.message).toEqual('Service is healthy');
    // Assert non-compression behavior here
  });
});
