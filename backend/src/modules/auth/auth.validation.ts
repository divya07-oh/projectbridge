import { z } from 'zod';

export const studentSignupSchema = z.object({
  body: z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    college: z.string().min(2),
  }),
});

export const businessSignupSchema = z.object({
  body: z.object({
    companyName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});
