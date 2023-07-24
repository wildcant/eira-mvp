<script lang="ts">
	import Select from '$components/ui/select/Select.svelte';
	import SelectContent from '$components/ui/select/SelectContent.svelte';
	import SelectGroup from '$components/ui/select/SelectGroup.svelte';
	import SelectItem from '$components/ui/select/SelectItem.svelte';
	import SelectTrigger from '$components/ui/select/SelectTrigger.svelte';
	import { locale, locales, localesLabels, t } from '$lib/i18n';
	import { setLanguageCookie } from './language-selector';
</script>

<Select bind:value={$locale} on:change={(e) => setLanguageCookie(e.detail)}>
	<SelectTrigger class="w-[144px]">{$t('component.language-selector.group-label')}</SelectTrigger>
	<SelectContent>
		<SelectGroup label={$t('component.language-selector.group-label')}>
			{#each locales as value}
				<SelectItem {value}>{localesLabels[value]}</SelectItem>
			{/each}
		</SelectGroup>
	</SelectContent>
</Select>
