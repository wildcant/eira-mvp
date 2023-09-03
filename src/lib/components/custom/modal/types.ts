import type { CreateDialogProps } from '@melt-ui/svelte';
import type { SvelteComponent } from 'svelte';
import type { ComponentRenderConfig } from 'svelte-headless-table';

export type ModalProps = { type: 'confirmation' | 'custom' } & (
	| CustomModalProps
	| ConfirmationModalProps
);

export type CustomModalProps = Pick<
	CreateDialogProps,
	'portal' | 'closeOnEscape' | 'closeOnOutsideClick'
> & {
	id: string;
	type: 'custom';
	title: string;
	// children: ConstructorOfATypedSvelteComponent;
	children: ComponentRenderConfig<SvelteComponent>;
	content?: { class?: string };
};

export type ConfirmationModalProps = {
	id: string;
	type: 'confirmation';
	title: string;
	// children?: ConstructorOfATypedSvelteComponent;
	description?: string;
	children?: ComponentRenderConfig<SvelteComponent>;
	labels?: { confirm?: string; cancel?: string };
	onCancel?: () => void;
	onConfirm: () => void;
};
