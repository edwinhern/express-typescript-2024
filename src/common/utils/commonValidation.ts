import { z } from 'zod';

export const commonValidations = {
  id: z.string().regex(/^\d+$/, 'ID must be a number').transform(Number),
  name: z
    .string()
    .min(1, 'Name cannot be empty')
    .refine((name) => /^[a-zA-Z ]+$/.test(name), { message: 'Name must contain only letters and spaces' }),
  email: z.string().email({ message: 'Invalid email format' }),
  // ... other common validations
};
