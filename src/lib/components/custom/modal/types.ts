import type { SvelteComponent } from 'svelte';
import type { ComponentRenderConfig } from 'svelte-headless-table';

export type ModalProps = { type: 'confirmation' | 'custom' } & (
	| CustomModalProps
	| ConfirmationModalProps
);

export type CustomModalProps = {
	id: string;
	type: 'custom';
	title: string;
	// children: ConstructorOfATypedSvelteComponent;
	children: ComponentRenderConfig<SvelteComponent>;
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
