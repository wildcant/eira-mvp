/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DB } from 'kysely-codegen';
import { z } from 'zod';
import type { DatabaseTypes } from './types';
import type { WithT } from '$lib/i18n/api';
import type { SelectExpression } from 'kysely';
import { error } from '@sveltejs/kit';

/** See https://github.com/colinhacks/zod/issues/53 for context. */
type TypeToZod<T> = {
	[K in keyof T]: T[K] extends string | number | boolean | null | undefined
		? undefined extends T[K]
			? z.ZodOptional<z.ZodType<Exclude<T[K], undefined>>>
			: z.ZodType<T[K]>
		: z.ZodObject<TypeToZod<T[K]>>;
};

/** Transform typescript types to zod schemas https://transform.tools/typescript-to-zod */
const dbSchemas = {
	Product: z.object({
		id: z.number(),
		name: z.string(),
		description: z.string().nullable(),
		departmentId: z.number(),
		categoryId: z.number(),
		subCategoryId: z.number().nullable(),
		imageId: z.number().nullable(),
		createdAt: z.string(),
		updatedAt: z.string().nullable()
	} satisfies TypeToZod<DatabaseTypes['Product']>),
	Attribute: z.object({
		id: z.number(),
		name: z.string(),
		unitOfMeasure: z.string().nullable(),
		createdAt: z.string(),
		updatedAt: z.string().nullable()
	})
} satisfies { [table in keyof DB]?: z.AnyZodObject };

function zodEnumFromObjKeys<K extends string>(obj: Record<K, any>): z.ZodEnum<[K, ...K[]]> {
	const [firstKey, ...otherKeys] = Object.keys(obj) as K[];
	return z.enum([firstKey, ...otherKeys]);
}

const dbFields = {
	Product: zodEnumFromObjKeys(dbSchemas.Product.shape),
	Attribute: zodEnumFromObjKeys(dbSchemas.Attribute.shape)
} satisfies { [table in keyof DB]?: z.ZodEnum<any> };

type ValidateFieldsForEntityArgs = WithT & {
	fields: string | null;
	entity: keyof typeof dbFields;
};

export function selectFromFields<T extends keyof DB>({
	$t,
	fields,
	entity
}: ValidateFieldsForEntityArgs) {
	if (!fields) return;
	const fieldsList = fields.split(',');
	if (!fieldsList?.length) return;
	let parsedFields: Array<SelectExpression<DB, T>> = [];

	try {
		parsedFields = fieldsList
			.map((field) => dbFields[entity].parse(field))
			.map((field) => `${entity}.${field}` as SelectExpression<DB, T>);
	} catch (err) {
		console.error(err);
		if (err instanceof Error) {
			const allowed = Object.values(dbFields[entity].enum)
				.map((v) => `"${v}"`)
				.join(', ');
			throw error(400, $t('error.invalid-fields-param', { fields, entity, allowed }));
		}
		throw error(500, $t('error.internal-server-error'));
	}
	return parsedFields;
}
