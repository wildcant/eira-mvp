import { t } from '$lib/i18n';
import type { WithT } from '$lib/i18n/api';
import { derived } from 'svelte/store';
import { z } from 'zod';
const hexColorRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export const generateDepartmentSchema = ({ $t }: WithT) =>
	z.object({
		name: z
			.string()
			.min(1, {
				message: `${$t('common.word.name.capitalize')} ${$t('common.phrase.is-required')}`
			})
			.max(100),
		color: z.string().refine((color) => hexColorRegex.test(color))
	});

export const departmentSchema = derived(t, ($t) => generateDepartmentSchema({ $t }));

export type DepartmentZodSchema = ReturnType<typeof generateDepartmentSchema>;
export type DepartmentSchema = z.infer<DepartmentZodSchema>;
