import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().max(2000).optional(),
});

export const updateProjectSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  description: z.string().max(2000).optional(),
});

export const addMemberSchema = z.object({
  userId: z.string(),
  role: z.enum(['manager', 'member']).default('member'),
});

export const updateMemberSchema = z.object({
  role: z.enum(['manager', 'member']),
});
