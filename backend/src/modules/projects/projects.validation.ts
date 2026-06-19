import { z } from 'zod';

export const createProjectSchema = z.object({
  body: z.object({
    title: z.string().min(5),
    description: z.string().min(20),
    budget: z.string(),
    duration: z.string(),
    category: z.string(),
    skills: z.array(z.string()).min(1),
    remote: z.boolean().optional(),
    deliverables: z.array(z.string()).optional(),
    aboutClient: z.string().optional(),
    company: z.string().optional(),
  }),
});

export const updateProjectSchema = z.object({
  body: z.object({
    title: z.string().min(5).optional(),
    description: z.string().min(20).optional(),
    budget: z.string().optional(),
    duration: z.string().optional(),
    category: z.string().optional(),
    skills: z.array(z.string()).min(1).optional(),
    remote: z.boolean().optional(),
    deliverables: z.array(z.string()).optional(),
    aboutClient: z.string().optional(),
    company: z.string().optional(),
    status: z.enum(['OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
  }),
});
