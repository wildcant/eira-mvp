/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Action, ActionReturn } from 'svelte/action';

export function useActions(node: HTMLElement | SVGElement, actions: Action[]) {
	const actionReturns: ActionReturn<any>[] = [];

	if (actions) {
		for (let i = 0; i < actions.length; i++) {
			const actionEntry = actions[i];
			const action = Array.isArray(actionEntry) ? actionEntry[0] : actionEntry;
			if (Array.isArray(actionEntry) && actionEntry.length > 1) {
				actionReturns.push(action(node as HTMLElement & SVGElement, actionEntry[1]));
			} else {
				actionReturns.push(action(node as HTMLElement & SVGElement));
			}
		}
	}

	return {
		update(actions: Action[]) {
			if (((actions && actions.length) || 0) != actionReturns.length) {
				throw new Error('You must not change the length of an actions array.');
			}

			if (actions) {
				for (let i = 0; i < actions.length; i++) {
					const returnEntry = actionReturns[i];
					if (returnEntry && returnEntry.update) {
						const actionEntry = actions[i];
						if (Array.isArray(actionEntry) && actionEntry.length > 1) {
							returnEntry.update(actionEntry[1]);
						} else {
							(returnEntry.update as () => void)?.();
						}
					}
				}
			}
		},

		destroy() {
			for (let i = 0; i < actionReturns.length; i++) {
				const returnEntry = actionReturns[i];
				if (returnEntry && returnEntry.destroy) {
					returnEntry.destroy();
				}
			}
		}
	};
}
