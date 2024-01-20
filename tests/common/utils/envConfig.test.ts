import { getEnvVar } from '@common/utils/envConfig';

describe('Environment Configuration', () => {
  afterEach(() => {
    jest.resetModules();
  });

  it('should correctly get a string environment variable', () => {
    process.env.TEST_VAR = 'test';
    expect(getEnvVar('TEST_VAR', 'string')).toBe('test');
  });

  it('should correctly get a number environment variable', () => {
    process.env.TEST_VAR = '3000';
    expect(getEnvVar('TEST_VAR', 'number')).toBe(3000);
  });

  it('should throw an error for missing environment variable', () => {
    delete process.env.TEST_VAR;
    expect(() => getEnvVar('TEST_VAR', 'string')).toThrow();
  });

  it('should throw an error for invalid number environment variable', () => {
    process.env.TEST_VAR = 'invalid';
    expect(() => getEnvVar('TEST_VAR', 'number')).toThrow();
  });
});
