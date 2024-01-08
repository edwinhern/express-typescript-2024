import request from 'supertest';

import { ServiceResponse } from '@common/models/serviceResponse';
import { User } from '@modules/user/userModel';
import { app } from '@src/server';

describe('User API endpoints', () => {
  it('GET /users - success', async () => {
    const response = await request(app).get('/users');
    const result: ServiceResponse<User[]> = response.body;

    expect(response.statusCode).toEqual(200);
    expect(result.success).toBeTruthy();
    expect(result.responseObject).toBeInstanceOf(Array);

    if (result.responseObject && result.responseObject.length > 0) {
      expect(result.responseObject[0]).toHaveProperty('id');
      expect(result.responseObject[0]).toHaveProperty('name');
    }
  });

  it('GET /users/:id - success', async () => {
    const response = await request(app).get('/users/1');
    const result: ServiceResponse<User> = response.body;

    expect(response.statusCode).toEqual(200);
    expect(result.success).toBeTruthy();
    expect(result.responseObject).toHaveProperty('id', 1);
  });
});
