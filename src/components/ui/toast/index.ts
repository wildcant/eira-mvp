import { cva } from 'class-variance-authority';

export const toastVariants = cva(
	'relative w-full bg-background rounded-lg border p-4 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11',
	{
		variants: {
			variant: {
				default: 'text-foreground',
				destructive:
					'text-destructive border-destructive/50 dark:border-destructive [&>svg]:text-destructive text-destructive'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	}
);
