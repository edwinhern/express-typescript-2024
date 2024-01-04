import assert from 'node:assert/strict';

import request from 'supertest';

import { ServiceResponse } from '../../../../common/models/serviceResponse';
import { app } from '../../../../server';
import { User } from '../../userModel';

describe('User API endpoints', () => {
  test('GET /users - success', async () => {
    const response = await request(app).get('/users');
    const result: ServiceResponse<User[]> = response.body as ServiceResponse<User[]>;

    assert.strictEqual(response.statusCode, 200);
    assert.ok(result.success);
    assert.ok(result.responseObject instanceof Array);

    if (result.responseObject && result.responseObject.length > 0) {
      assert.ok(Object.prototype.hasOwnProperty.call(result.responseObject[0], 'id'));
      assert.ok(Object.prototype.hasOwnProperty.call(result.responseObject[0], 'name'));
    }
  });

  test('GET /users/:id - success', async () => {
    const response = await request(app).get('/users/1');
    const result: ServiceResponse<User> = response.body as ServiceResponse<User>;

    assert.strictEqual(response.statusCode, 200);
    assert.ok(result.success);
    assert.ok(Object.prototype.hasOwnProperty.call(result.responseObject, 'id'));
  });
});
