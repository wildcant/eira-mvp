import Root from './components/disclosure.svelte';
import Link from './components/disclosure-link.svelte';
import Content from './components/disclosure-content.svelte';
import Trigger from './components/disclosure-trigger.svelte';

export {
	Root,
	Link,
	Content,
	Trigger,
	//
	Root as Collapsible,
	Link as DisclosureLink,
	Content as CollapsibleContent,
	Trigger as CollapsibleTrigger
};
export * from './types.js';
