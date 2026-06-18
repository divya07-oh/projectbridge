import { z } from 'zod';

export const updateStudentProfileSchema = z.object({
  body: z.object({
    fullName: z.string().min(2).optional(),
    college: z.string().min(2).optional(),
    bio: z.string().optional(),
    skills: z.array(z.string()).optional(),
    github: z.string().url().optional().or(z.literal('')),
    linkedin: z.string().url().optional().or(z.literal('')),
  }),
});
