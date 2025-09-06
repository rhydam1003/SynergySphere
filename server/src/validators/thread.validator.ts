import { z } from 'zod';

export const createThreadSchema = z.object({
  title: z.string().min(1).max(200),
});

export const updateThreadSchema = z.object({
  title: z.string().min(1).max(200),
});

export const createMessageSchema = z.object({
  body: z.string().min(1).max(10000),
  attachments: z.array(z.string()).optional(),
});
