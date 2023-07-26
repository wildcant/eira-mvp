import { z } from 'zod';

export const categorySchema = z.object({
	name: z.string().min(1).max(100),
	department: z.number().int()
});

export type CategoryZodSchema = typeof categorySchema;
export type CategorySchema = z.infer<typeof categorySchema>;
