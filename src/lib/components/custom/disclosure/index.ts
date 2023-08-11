import Root from './components/Disclosure.svelte';
import Link from './components/DisclosureLink.svelte';
import Content from './components/DisclosureContent.svelte';
import Trigger from './components/DisclosureTrigger.svelte';

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
