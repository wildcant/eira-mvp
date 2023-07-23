import type { VariantProps } from 'class-variance-authority';
import type { toastVariants } from '.';

export type ToastVariant = VariantProps<typeof toastVariants>['variant'];

export type ToastProps = {
	title: string;
	description: string;
	variant: ToastVariant;
};
