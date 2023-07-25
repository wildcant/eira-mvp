import { z } from 'zod';
const hexColorRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export const departmentSchema = z.object({
	name: z.string().min(1).max(100),
	color: z.string().refine((color) => hexColorRegex.test(color))
});

export type DepartmentZodSchema = typeof departmentSchema;
export type DepartmentSchema = z.infer<typeof departmentSchema>;
