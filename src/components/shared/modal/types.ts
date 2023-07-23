export type ModalProps = { type: 'confirmation' | 'custom' } & (
	| CustomModalProps
	| ConfirmationModalProps
);

export type CustomModalProps = {
	id: string;
	type: 'custom';
	title: string;
	children: ConstructorOfATypedSvelteComponent;
};

export type ConfirmationModalProps = {
	id: string;
	type: 'confirmation';
	title: string;
	children?: ConstructorOfATypedSvelteComponent;
	labels?: { confirm?: string; cancel?: string };
	onCancel?: () => void;
	onConfirm: () => void;
};
