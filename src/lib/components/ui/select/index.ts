import { Select as SelectPrimitive } from '$lib/components/primitives';

import Root from './components/select.svelte';
import Label from './components/select-label.svelte';
import Item from './components/select-item.svelte';
import Content from './components/select-content.svelte';
import Trigger from './components/select-trigger.svelte';
import Separator from './components/select-separator.svelte';

const Group = SelectPrimitive.Group;
const Input = SelectPrimitive.Input;
const Value = SelectPrimitive.Value;
export {
	Root,
	Group,
	Input,
	Label,
	Item,
	Value,
	Content,
	Trigger,
	Separator,
	//
	Root as Select,
	Group as SelectGroup,
	Input as SelectInput,
	Label as SelectLabel,
	Item as SelectItem,
	Value as SelectValue,
	Content as SelectContent,
	Trigger as SelectTrigger,
	Separator as SelectSeparator
};
