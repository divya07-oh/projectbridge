import { z } from 'zod';

export const createProjectSchema = z.object({
  body: z.object({
    title: z.string().min(5),
    description: z.string().min(20),
    budget: z.string(),
    deadline: z.string(),
    category: z.string(),
    skills: z.array(z.string()).min(1),
  }),
});

export const updateProjectSchema = z.object({
  body: z.object({
    title: z.string().min(5).optional(),
    description: z.string().min(20).optional(),
    budget: z.string().optional(),
    deadline: z.string().optional(),
    category: z.string().optional(),
    skills: z.array(z.string()).min(1).optional(),
    status: z.enum(['OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
  }),
});
