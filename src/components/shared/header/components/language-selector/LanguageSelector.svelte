<script lang="ts">
	import Select from '$components/ui/select/Select.svelte';
	import SelectContent from '$components/ui/select/SelectContent.svelte';
	import SelectGroup from '$components/ui/select/SelectGroup.svelte';
	import SelectItem from '$components/ui/select/SelectItem.svelte';
	import SelectTrigger from '$components/ui/select/SelectTrigger.svelte';
	import { locale, t } from '$lib/i18n';
	import { setLanguageCookie } from './language-selector';

	const labels = { en: 'English', es: 'Español' };
	const locales = ['en', 'es'] as const;
</script>

<Select bind:value={$locale} on:change={(e) => setLanguageCookie(e.detail)}>
	<SelectTrigger class="w-[144px]">{$t('component.language-selector.group-label')}</SelectTrigger>
	<SelectContent>
		<SelectGroup label={$t('component.language-selector.group-label')}>
			{#each locales as value}
				<SelectItem {value}>{labels[value]}</SelectItem>
			{/each}
		</SelectGroup>
	</SelectContent>
</Select>
