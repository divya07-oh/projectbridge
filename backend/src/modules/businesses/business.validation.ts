import { z } from 'zod';

export const updateBusinessProfileSchema = z.object({
  body: z.object({
    companyName: z.string().min(2).optional(),
    description: z.string().optional(),
    website: z.string().url().optional().or(z.literal('')),
  }),
});
