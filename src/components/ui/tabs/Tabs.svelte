<script lang="ts" context="module">
	import { uniqueContext } from '$components/helpers/uniqueContext';
	import { createTabs } from '@melt-ui/svelte';

	type TabsContextProps = ReturnType<typeof createTabs> & {
		tabs: number;
		panels: number;
		enumerateTab: () => number;
		enumeratePanel: () => number;
	};
	export const { getContext: getTabsContext, setContext: setTabsContext } =
		uniqueContext<TabsContextProps>();
</script>

<script lang="ts">
	const { root, list, content, trigger, value, options } = createTabs({
		value: 'tab1'
	});

	/** For others solutions on how to iterate over children @see https://github.com/sveltejs/svelte/issues/5381*/
	let tabs = 0;
	let panels = 0;
	setTabsContext({
		root,
		list,
		content,
		trigger,
		value,
		options,
		tabs: -1,
		panels: -1,
		enumerateTab: () => (tabs += 1),
		enumeratePanel: () => (panels += 1)
	});
</script>

<div melt={$root} class="root">
	<div melt={$list} class="list" aria-label="Manage your account">
		<!-- 
		<button melt={$trigger('tab1')} class="trigger">Account</button>
		<button melt={$trigger('tab2')} class="trigger">Password</button>
		<button
			melt={$trigger({
				value: 'tab3',
				disabled: true
			})}
			class="trigger opacity-50">Disabled</button
		>
		<button melt={$trigger('tab4')} class="trigger">Settings</button>
 -->
		<slot name="list" />
	</div>
	<!-- 
	<div melt={$content('tab1')} class="content">
		<p class="description">Make changes to your account here. Click save when you're done.</p>
		<fieldset>
			<label for="name"> Name </label>
			<input id="name" value="Thomas G. Lopes" />
		</fieldset>

		<div class="actions">
			<button>Save changes</button>
		</div>
	</div>
	<div melt={$content('tab2')} class="content">
		<p class="description">Change your password here. Click save when you're done.</p>
		<fieldset>
			<label for="new"> New password </label>
			<input id="new" type="password" />
		</fieldset>
		<div class="actions">
			<button>Save changes</button>
		</div>
	</div>
	<div melt={$content('tab4')} class="content">
		<p class="description">Change your settings here. Click save when you're done.</p>

		<fieldset>
			<label for="new"> New email </label>
			<input id="new" type="password" />
		</fieldset>
		<div class="actions">
			<button>Save changes</button>
		</div>
	</div>
   -->
	<slot />
</div>

<!-- 
<div class="tabs">
	<h3 id="tablist-1">Danish Composers</h3>
	<div role="tablist" aria-labelledby="tablist-1" class="manual">
		<button id="tab-1" type="button" role="tab" aria-selected="true" aria-controls="tabpanel-1">
			<span class="focus">Maria Ahlefeldt</span>
		</button>
		<button
			id="tab-2"
			type="button"
			role="tab"
			aria-selected="false"
			aria-controls="tabpanel-2"
			tabindex="-1"
		>
			<span class="focus">Carl Andersen</span>
		</button>
		<button
			id="tab-3"
			type="button"
			role="tab"
			aria-selected="false"
			aria-controls="tabpanel-3"
			tabindex="-1"
		>
			<span class="focus">Ida da Fonseca</span>
		</button>
		<button
			id="tab-4"
			type="button"
			role="tab"
			aria-selected="false"
			aria-controls="tabpanel-4"
			tabindex="-1"
		>
			<span class="focus">Peter Müller</span>
		</button>
	</div>

	<div id="tabpanel-1" role="tabpanel" aria-labelledby="tab-1">
		<p>
			<a href="https://en.wikipedia.org/wiki/Maria_Theresia_Ahlefeldt">Maria Theresia Ahlefeldt</a>
			(16 January 1755 – 20 December 1810) was a Danish, (originally German), composer. She is known
			as the first female composer in Denmark. Maria Theresia composed music for several ballets, operas,
			and plays of the royal theatre. She was given good critic as a composer and described as a “<span
				lang="da">virkelig Tonekunstnerinde</span
			>” ('a True Artist of Music').
		</p>
	</div>
	<div id="tabpanel-2" role="tabpanel" aria-labelledby="tab-2" class="is-hidden">
		<p>
			<a href="https://en.wikipedia.org/wiki/Joachim_Andersen_(composer)">Carl Joachim Andersen</a>
			(29 April 1847 – 7 May 1909) was a Danish flutist, conductor and composer born in Copenhagen, son
			of the flutist Christian Joachim Andersen. Both as a virtuoso and as composer of flute music, he
			is considered one of the best of his time. He was considered to be a tough leader and teacher and
			demanded as such a lot from his orchestras but through that style he reached a high level.
		</p>
	</div>
	<div id="tabpanel-3" role="tabpanel" aria-labelledby="tab-3" class="is-hidden">
		<p>
			<a href="https://en.wikipedia.org/wiki/Ida_Henriette_da_Fonseca">Ida Henriette da Fonseca</a>
			(July 27, 1802 – July 6, 1858) was a Danish opera singer and composer. Ida Henriette da Fonseca
			was the daughter of Abraham da Fonseca (1776–1849) and Marie Sofie Kiærskou (1784–1863). She and
			her sister Emilie da Fonseca were students of Giuseppe Siboni, choir master of the Opera in Copenhagen.
			She was given a place at the royal Opera alongside her sister the same year she debuted in 1827.
		</p>
	</div>
	<div id="tabpanel-4" role="tabpanel" aria-labelledby="tab-4" class="is-hidden">
		<p>
			<a href="https://en.wikipedia.org/wiki/Peter_Lange-M%C3%BCller">Peter Erasmus Lange-Müller</a>
			(1 December 1850 – 26 February 1926) was a Danish composer and pianist. His compositional style
			was influenced by Danish folk music and by the work of Robert Schumann; Johannes Brahms; and his
			Danish countrymen, including J.P.E. Hartmann.
		</p>
	</div>
</div>
 -->

<!-- 
<Tabs>
  <TabList>
    <Tab>sample</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      The panel
    </TabPanel>
  </TabPanels>
</Tabs>
 -->

<!-- 
<style lang="postcss">
	/* Tab Parts */
	.root {
		@apply flex flex-col overflow-hidden rounded-md shadow-lg;
		@apply data-[orientation=vertical]:flex-row;
	}

	.list {
		@apply flex shrink-0 overflow-x-auto border-b border-zinc-100 bg-white;
		@apply data-[orientation=vertical]:flex-col data-[orientation=vertical]:border-r;
	}

	.trigger {
		@apply flex h-11 flex-1 cursor-default select-none items-center;
		@apply justify-center rounded-none bg-white px-4 leading-none;
		@apply text-zinc-900 focus:relative;
	}

	.trigger[data-orientation='vertical'] {
		@apply w-full flex-grow-0 rounded-none border-b border-r-2;
		@apply border-transparent border-b-zinc-100 py-4 last:border-b-0;
	}

	.trigger[data-state='active'] {
		@apply text-zinc-700 focus:relative;
	}

	.trigger[data-state='active'][data-orientation='horizontal'] {
		@apply shadow-[inset_0_-1px_0_0,0_1px_0_0] shadow-current focus:relative;
	}

	.trigger[data-state='active'][data-orientation='vertical'] {
		@apply border-r-zinc-500;
	}

	.content {
		@apply grow bg-white p-5;
	}

	/* Content Elements */
	.description {
		@apply mb-5 leading-normal text-zinc-950;
	}

	fieldset {
		@apply mb-4 flex w-full flex-col justify-start;
	}

	label {
		@apply mb-2.5 block text-sm leading-none text-zinc-950;
	}

	input {
		@apply h-8 shrink-0 grow rounded border px-2.5 leading-none text-zinc-900;
		@apply focus:ring focus:ring-zinc-800;
	}

	.actions {
		@apply mt-5 flex justify-end;
	}

	button {
		@apply inline-flex h-8 cursor-default items-center justify-center rounded;
		@apply bg-green-100 px-[15px] font-medium leading-none text-green-900;
	}
</style>
 -->
