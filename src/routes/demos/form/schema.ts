import { z } from 'zod';

export const schema = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	complex: z.string(),
	simple: z.string(),
	image: z.string()
});
