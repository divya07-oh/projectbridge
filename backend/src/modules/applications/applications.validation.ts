import { z } from 'zod';

export const applyToProjectSchema = z.object({
  body: z.object({
    proposal: z.string().min(10, 'Proposal must be at least 10 characters long'),
    estimatedDuration: z.string().min(1, 'Estimated duration is required'),
    budget: z.number().positive('Budget must be positive')
  })
});
