import { z } from 'zod';

export const commonValidations = {
  id: z.string().regex(/^\d+$/, 'ID must be a number').transform(Number),
  // ... other common validations
};
