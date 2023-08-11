<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { locale, t } from '$lib/i18n';
	import { setLanguageCookie } from '.';
	import { browser } from '$app/environment';

	const labels = { en: 'English', es: 'Español' };
	const locales = ['en', 'es'] as const;
	$: currentLocale = $locale as 'en' | 'es';
	$: if ($locale && browser) setLanguageCookie($locale);
</script>

<Select.Root bind:value={$locale}>
	<Select.Trigger class="w-[144px]">{labels[currentLocale]}</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.Label>{$t('component.language-selector.group-label')}</Select.Label>
			{#each locales as value}
				<Select.Item {value}>{labels[value]}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
