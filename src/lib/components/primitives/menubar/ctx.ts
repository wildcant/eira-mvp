import {
	createMenubar,
	type Menubar as MenubarReturn,
	type CreateMenubarProps as MenubarProps,
	type MenubarMenu as MenubarMenuReturn,
	type MenubarMenuRadioGroup as MenubarRadioGroupReturn,
	type CreateMenuRadioGroupProps,
	type CreateMenubarSubmenuProps,
	type CreateMenubarMenuProps,
	type MenubarMenuSubmenu as MenubarSubReturn,
	type CreateMenuCheckboxItemProps,
	type Checkbox as CheckboxReturn
} from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';
import { generateId, getOptionUpdater, removeUndefined } from '$lib/components/internal/index.js';
import type { Readable } from 'svelte/store';

const NAME = 'Menubar';
const MENU_NAME = 'MenubarMenu';
const SUB_NAME = 'MenubarSub';
const CHECKBOX_ITEM_NAME = 'MenubarCheckboxItem';
const RADIO_GROUP_NAME = 'MenubarRadioGroup';
const RADIO_ITEM_NAME = 'MenubarRadioItem';
const GROUP_NAME = 'MenubarGroup';

export const ctx = {
	get,
	set,
	setSub,
	setMenu,
	getMenu,
	getItem,
	getTrigger: () => getMenu().elements.trigger,
	getContent,
	getSeparator: () => getMenu().elements.separator,
	setRadioItem,
	setRadioGroup,
	getSubTrigger,
	getSubContent,
	setCheckboxItem,
	getRadioIndicator,
	getCheckboxIndicator,
	setGroup,
	getGroupLabel
};

function get() {
	return getContext<MenubarReturn>(NAME);
}

function set(props: MenubarProps) {
	const menubar = createMenubar(removeUndefined(props));
	setContext(NAME, menubar);
	return {
		...menubar,
		updateOption: getOptionUpdater(menubar.options)
	};
}

function getMenu() {
	return getContext<MenubarMenuReturn>(MENU_NAME);
}

function setMenu(props: CreateMenubarMenuProps) {
	const {
		builders: { createMenu }
	} = get();

	const menu = createMenu({ ...removeUndefined(props), forceVisible: false });
	setContext(MENU_NAME, menu);
	return {
		...menu,
		updateOption: getOptionUpdater(menu.options)
	};
}

function setSub(props: CreateMenubarSubmenuProps) {
	const {
		builders: { createSubmenu }
	} = getMenu();
	const sub = createSubmenu(removeUndefined(props));
	setContext(SUB_NAME, sub);
	return {
		...sub,
		updateOption: getOptionUpdater(sub.options)
	};
}

function setRadioGroup(props: CreateMenuRadioGroupProps) {
	const {
		builders: { createMenuRadioGroup }
	} = getMenu();
	const radioGroup = createMenuRadioGroup(removeUndefined(props));
	setContext(RADIO_GROUP_NAME, radioGroup);
	return radioGroup;
}

function setRadioItem(value: string) {
	const {
		elements: { radioItem },
		helpers: { isChecked }
	} = getContext<MenubarRadioGroupReturn>(RADIO_GROUP_NAME);
	setContext(RADIO_ITEM_NAME, { isChecked, value });
	return radioItem;
}

function getSubTrigger() {
	const {
		elements: { subTrigger }
	} = getContext<MenubarSubReturn>(SUB_NAME);
	return subTrigger;
}

function getContent(sideOffset = 5) {
	const {
		elements: { menu: content },
		states: { open },
		options: { positioning }
	} = getMenu();

	positioning.update((prev) => ({ ...prev, gutter: sideOffset }));

	return { content, open };
}

function getSubContent(sideOffset = -1) {
	const {
		elements: { subMenu: subContent },
		states: { subOpen },
		options: { positioning }
	} = getContext<MenubarSubReturn>(SUB_NAME);

	positioning.update((prev) => ({ ...prev, gutter: sideOffset }));

	return { subContent, subOpen };
}

function getItem() {
	const {
		elements: { item }
	} = getMenu();
	return { item };
}

function setCheckboxItem(props: CreateMenuCheckboxItemProps) {
	const {
		builders: { createCheckboxItem }
	} = getMenu();
	const checkboxItem = createCheckboxItem(removeUndefined(props));
	setContext(CHECKBOX_ITEM_NAME, checkboxItem.states.checked);

	return {
		...checkboxItem,
		updateOption: getOptionUpdater(checkboxItem.options)
	};
}

function getCheckboxIndicator() {
	return getContext<CheckboxReturn['states']['checked']>(CHECKBOX_ITEM_NAME);
}

function getRadioIndicator() {
	return getContext<{
		isChecked: Readable<(itemValue: string) => boolean>;
		value: string;
	}>(RADIO_ITEM_NAME);
}
function setGroup() {
	const {
		elements: { group }
	} = getMenu();
	const id = generateId();
	setContext(GROUP_NAME, id);
	return { group, id };
}

function getGroupLabel() {
	const id = getContext<string>(GROUP_NAME);
	const {
		elements: { groupLabel }
	} = getMenu();
	return { groupLabel, id };
}
