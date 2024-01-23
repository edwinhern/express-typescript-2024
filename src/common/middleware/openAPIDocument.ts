import { OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import { getAPIBaseUrl } from '@common/utils/envConfig';
import { healthCheckRegistry } from '@modules/healthCheck/healthCheckRegistery';
import { userRegistry } from '@modules/user/userRegistery';

export function generateOpenAPIDocument() {
  const registry = new OpenAPIRegistry([healthCheckRegistry, userRegistry]);
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Swagger API',
      description: 'API for user management',
    },
    servers: [{ url: getAPIBaseUrl() }],
  });
}
