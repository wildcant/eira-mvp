<script lang="ts">
	import { browser } from '$app/environment';
	import { badgeVariants } from '$lib/components/ui/badge';
	import { selectItemVariants } from '$lib/components/ui/select/components/select-item.svelte';
	import { cn } from '$lib/utils';
	import {
		INTERACTION_KEYS,
		createPopover,
		createTagsInput,
		melt,
		type Tag
	} from '@melt-ui/svelte';
	import {
		FIRST_LAST_KEYS,
		addHighlight,
		back,
		effect,
		forward,
		getOptions,
		isElementDisabled,
		isHTMLElement,
		kbd,
		last,
		next,
		prev,
		removeHighlight,
		sleep
	} from '@melt-ui/svelte/internal/helpers';
	import { Check, X } from 'lucide-svelte';
	import { tick } from 'svelte';
	import type {
		KeyboardEventHandler,
		MouseEventHandler,
		PointerEventHandler
	} from 'svelte/elements';
	import { derived, writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { selectContentVariants } from '../autocomplete/components/autocomplete-options.svelte';

	export { defaultItems as items };

	let menuEl: HTMLUListElement;
	let inputEl: HTMLInputElement;

	const tags = writable<Tag[]>([]);
	const allowedTags: Tag[] = [
		{ id: '0', value: 'svelte' },
		{ id: '1', value: 'typescript' },
		{ id: '2', value: 'react' }
	];

	const {
		elements: { root, input, tag, deleteTrigger, edit },
		states: { inputValue }
	} = createTagsInput({
		tags,
		allowed: allowedTags.map((t) => t.value),
		unique: true,
		add: (v) =>
			new Promise((res) =>
				res({
					id: allowedTags
						.map((t) => t.value)
						.indexOf(v.toLowerCase())
						.toString(),
					value: v.toLowerCase()
				} satisfies Tag)
			)
	});

	const {
		elements: { trigger, content },
		states: { open }
	} = createPopover({
		disableFocusTrap: true,
		positioning: { placement: 'bottom', strategy: 'absolute' },
		portal: '#container'
	});

	const items = writable<Tag[]>(allowedTags);
	// The currently highlighted menu item.
	const highlightedItem = writable<HTMLElement | null>(null);

	const filteredItems = derived([items, inputValue], ([$items, $inputValue]) => {
		return $items.filter((item) => {
			const normalize = (str: string) => str.normalize().toLowerCase();
			const normalizedInput = normalize($inputValue);
			return normalizedInput === '' || normalize(item.value).includes(normalizedInput);
		});
	});

	const openMenu = () => ($open = true);
	const closeMenu = () => ($open = false);

	function toggleItem(element: HTMLElement) {
		if (element.dataset.index) {
			const index = parseInt(element.dataset.index, 10);
			const item = $filteredItems[index];

			tags.update((currentTags) => {
				const idx = currentTags.findIndex((t) => t.value === item.value);
				if (idx !== -1) {
					const updatedTags = [...currentTags];
					updatedTags.splice(idx, 1);
					return updatedTags;
				} else {
					return currentTags.concat(item);
				}
			});

			if (inputEl) {
				inputEl.value = '';
				inputEl.focus();
			}
		}
	}

	// Handle all input key events including typing, meta, and navigation.
	const handleInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
		const node = e.currentTarget;

		/**
		 * When the menu is closed...
		 */
		if (!$open) {
			// Pressing one of the interaction keys shouldn't open the menu.
			if (INTERACTION_KEYS.includes(e.key)) {
				return;
			}

			// Tab should not open the menu.
			if (e.key === kbd.TAB) {
				return;
			}

			// Pressing backspace when the input is blank shouldn't open the menu.
			if (e.key === kbd.BACKSPACE && node.value === '') {
				return;
			}

			// All other events should open the menu.
			openMenu();

			tick().then(() => {
				const enabledItems = Array.from(menuEl.children).filter((item): item is HTMLElement =>
					isHTMLElement(item)
				);

				if (!enabledItems.length) return;

				if (e.key === kbd.ARROW_DOWN) {
					highlightedItem.set(enabledItems[0]);
				} else if (e.key === kbd.ARROW_UP) {
					highlightedItem.set(last(enabledItems));
				}
			});
		}

		/**
		 * When the menu is open...
		 */
		// Pressing `esc` should close the menu.
		if (e.key === kbd.TAB || e.key === kbd.ESCAPE) {
			closeMenu();
			return;
		}

		// Pressing enter with a highlighted item should add or remove it from tags.
		if (e.key === kbd.ENTER) {
			if ($highlightedItem) {
				toggleItem($highlightedItem);
			}
			closeMenu();
		}
		// Pressing Alt + Up should close the menu.
		if (e.key === kbd.ARROW_UP && e.altKey) {
			closeMenu();
		}
		// Navigation (up, down, etc.) should change the highlighted item.

		if (FIRST_LAST_KEYS.includes(e.key)) {
			e.preventDefault();
			// Get all the menu items.

			const itemElements = getOptions(menuEl);
			if (!itemElements.length) return;
			// Disabled items can't be highlighted. Skip them.
			const candidateNodes = itemElements.filter((opt) => !isElementDisabled(opt));
			// Get the index of the currently highlighted item.
			const $currentItem = $highlightedItem;
			const currentIndex = $currentItem ? candidateNodes.indexOf($currentItem) : -1;
			// Find the next menu item to highlight.
			const $loop = true;

			let nextItem: HTMLElement;
			switch (e.key) {
				case kbd.ARROW_DOWN:
					nextItem = next(candidateNodes, currentIndex, $loop);
					break;
				case kbd.ARROW_UP:
					nextItem = prev(candidateNodes, currentIndex, $loop);
					break;
				case kbd.PAGE_DOWN:
					nextItem = forward(candidateNodes, currentIndex, 10, $loop);
					break;
				case kbd.PAGE_UP:
					nextItem = back(candidateNodes, currentIndex, 10, $loop);
					break;
				case kbd.HOME:
					nextItem = candidateNodes[0];
					break;
				case kbd.END:
					nextItem = last(candidateNodes);
					break;
				default:
					return;
			}
			// Highlight the new item and scroll it into view.
			highlightedItem.set(nextItem);
			nextItem.scrollIntoView({ block: 'nearest' });
		}
	};

	// Handle highlighting items when the pointer moves over them.
	const handleOptionPointerMove: PointerEventHandler<HTMLLIElement> = (e) => {
		const node = e.currentTarget;
		// Skip highlighting if the item is already highlighted.
		if (node === $highlightedItem) return;
		// If the item is disabled, clear the highlight.
		if (isElementDisabled(node)) {
			highlightedItem.set(null);
			return;
		}
		// Otherwise, proceed.
		highlightedItem.set(node);
	};

	const handleOptionClick: MouseEventHandler<HTMLLIElement> = (e) => {
		const node = e.currentTarget;
		// If the item is disabled, `preventDefault` to stop the input losing focus.
		if (isElementDisabled(node)) {
			e.preventDefault();
			return;
		}
		// Otherwise, toggle the item and close the menu.
		toggleItem(node);
		closeMenu();
	};

	effect([highlightedItem], ([$highlightedItem]) => {
		if (!browser || !menuEl) return;

		getOptions(menuEl).forEach((node) => {
			console.log({ node });

			if (node === $highlightedItem) {
				addHighlight(node);
			} else {
				removeHighlight(node);
			}
		});
		if ($highlightedItem) {
			sleep(1).then(() => $highlightedItem.scrollIntoView({ block: 'nearest' }));
		}
	});
</script>

<div id="container" class="relative">
	<div use:melt={$trigger}>
		<div
			use:melt={$root}
			class="flex min-w-[280px] flex-row flex-wrap gap-2.5 rounded-md bg-transparent px-3 py-2 border border-input ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
		>
			{#each $tags as t}
				<div
					use:melt={$tag(t)}
					class={cn(
						badgeVariants({ variant: 'outline' }),
						'ring-offset-background data-[selected]:ring-2 ring-ring'
					)}
				>
					{t.value}
					<button
						use:melt={$deleteTrigger(t)}
						class="flex h-full items-center px-1 enabled:hover:bg-accent enabled:hover:text-accent-foreground rounded-full"
					>
						<X class="square-3" />
					</button>
				</div>
				<div
					use:melt={$edit(t)}
					class="flex items-center overflow-hidden rounded-md px-1.5 [word-break:break-word] data-[invalid-edit]:focus:!ring-red-500"
				/>
			{/each}

			<input
				use:melt={$input}
				bind:this={inputEl}
				type="text"
				placeholder="Enter tags..."
				class="shrink grow basis-0 min-w-[4.5rem] border-0 outline-none focus:!ring-0 bg-transparent placeholder:text-muted-foreground text-sm data-[invalid]:text-red-500"
				on:keydown={handleInputKeyDown}
			/>
		</div>
	</div>

	{#if $open}
		<ul
			use:melt={$content}
			transition:fade={{ duration: 100 }}
			class={cn(selectContentVariants(), 'w-full')}
			bind:this={menuEl}
			on:pointerleave={() => highlightedItem.set(null)}
		>
			{#each $filteredItems as item, index}
				{@const isSelected = $tags.map((t) => t.value).includes(item.value)}
				<li
					role="option"
					class={cn(
						selectItemVariants(),
						'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground aria-selected:bg-muted cursor-pointer'
					)}
					data-index={index}
					aria-selected={isSelected}
					on:pointermove={handleOptionPointerMove}
					on:click={handleOptionClick}
					on:keypress
				>
					{#if isSelected}
						<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
							<Check class="h-4 w-4" />
						</span>
					{/if}
					{item.value}
				</li>
			{/each}
		</ul>
	{/if}
</div>
