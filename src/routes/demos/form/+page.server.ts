import { superValidate } from 'sveltekit-superforms/server';
import { schema } from './schema';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	// Server API:
	const form = await superValidate(schema);

	// Always return { form } in load and form actions.
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, schema);
		console.info('POST', form);

		// Convenient validation check:
		if (!form.valid) {
			// Again, always return { form } and things will just work.
			return fail(400, { form });
		}

		// Yep, return { form } here too
		return { form };
	}
};
