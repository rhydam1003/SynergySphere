import { z } from "zod";

export const schemas = {
  login: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  }),

  register: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
  }),

  project: z.object({
    name: z.string().min(3, "Project name must be at least 3 characters"),
    description: z
      .string()
      .max(2000, "Description must be less than 2000 characters")
      .optional(),
  }),

  task: z.object({
    title: z.string().min(3, "Task title must be at least 3 characters"),
    description: z
      .string()
      .max(10000, "Description must be less than 10000 characters")
      .optional(),
    assignee: z.string().optional(),
    dueDate: z.string().optional(),
    status: z.enum(["todo", "in_progress", "done"]).optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
  }),

  thread: z.object({
    title: z.string().min(3, "Thread title must be at least 3 characters"),
  }),

  message: z.object({
    body: z.string().min(1, "Message cannot be empty"),
  }),
};
