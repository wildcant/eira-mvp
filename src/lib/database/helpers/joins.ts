import type { ExpressionBuilder } from 'kysely';
import type { DB } from 'kysely-codegen';
import { jsonObjectFrom } from './sqlite';

type Join = {
	[table in keyof DB]?: {
		with: {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			[joinTable in Exclude<keyof DB, table>]?: (eb: ExpressionBuilder<DB, table>) => any;
		};
	};
};

export const join = {
	Category: {
		with: {
			Department: (eb) => {
				return jsonObjectFrom(
					eb
						.selectFrom('Department')
						.select([
							'Department.id',
							'Department.name',
							'Department.color',
							'Department.createdAt',
							'Department.updatedAt'
						])
						.whereRef('Category.departmentId', '=', 'Department.id')
				).as('department');
			}
		}
	},
	SubCategory: {
		with: {
			Category: (eb) => {
				return jsonObjectFrom(
					eb
						.selectFrom('Category')
						.select([
							'Category.id',
							'Category.name',
							'Category.departmentId',
							'Category.createdAt',
							'Category.updatedAt'
						])
						.whereRef('SubCategory.categoryId', '=', 'Category.id')
				).as('department');
			}
		}
	}
} satisfies Join;
