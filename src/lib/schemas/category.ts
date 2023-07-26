import { z } from 'zod';

export const categorySchema = z.object({
	name: z.string().min(1).max(100),
	departmentId: z.number().int().min(1)
});

export type CategoryZodSchema = typeof categorySchema;
export type CategorySchema = z.infer<typeof categorySchema>;
