<script lang="ts" generics="T extends AnyZodObject">
	// import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import * as Form from '$lib/components/custom/form';
	import { openToast } from '$lib/components/custom/toast';
	import { Button } from '$lib/components/ui/button';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { t } from '$lib/i18n';
	import { X } from 'lucide-svelte';
	import type { HTMLFormAttributes } from 'svelte/elements';
	import type { SuperValidated, Validators, ZodValidation } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import type { AnyZodObject } from 'zod';

	type $$Props = {
		form: SuperValidated<ZodValidation<T>>;
		validators: T;
		action: HTMLFormAttributes['action'];
	};

	let formValidatedForm: $$Props['form'];
	export let validators: $$Props['validators'];
	export let action: $$Props['action'];
	export { formValidatedForm as form };

	let mode: 'view' | 'edit' = 'view';
	$: form = superForm(formValidatedForm, {
		validators: validators as Validators<T>,
		onResult: ({ result }) => {
			if (result.type === 'success') {
				mode = 'view';
				openToast({
					data: {
						variant: 'default',
						title: $t('common.phrase.action-completed'),
						description: `
							${$t('entity.product.singular.capitalize')} 
							${$t('common.word.updated.lowercase')}
						`
					}
				});
			}
		},
		resetForm: true
	});

	const closeEdit = () => {
		form.reset();
		mode = 'view';
	};

	// $: ({ form: formData } = form);
</script>

<!-- <SuperDebug data={{ $formData }} /> -->
{#if mode === 'view'}
	<section class="flex w-full justify-between my-4">
		<div>
			<slot name="title" />
			<slot name="view" />
		</div>
		<Button variant="link" class="underline !p-0 !h-6" on:click={() => (mode = 'edit')}>
			Edit
		</Button>
	</section>
{/if}

{#if mode === 'edit'}
	<section class="border border-solid border-border rounded-3xl">
		<Form.Root {form} {action} class="w-full">
			<div class="px-6 py-4 relative">
				<Button
					variant="ghost"
					size="icon"
					class="absolute top-1 right-4 h-8 w-8"
					on:click={closeEdit}
				>
					<X />
				</Button>

				<slot name="title" />
				<slot name="edit" />
			</div>

			<Separator />
			<div class="px-6 mt-4 mb-4 flex justify-between items-center">
				<Button type="button" variant="link" size="xs" class="underline" on:click={closeEdit}>
					Cancel
				</Button>
				<Button size="xs" type="submit">Save</Button>
			</div>
		</Form.Root>
	</section>
{/if}
