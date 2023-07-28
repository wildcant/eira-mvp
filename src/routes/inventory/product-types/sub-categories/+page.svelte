<script lang="ts">
	import { t } from '$lib/i18n';

	export let data;

	const { subCategoriesJson: initial } = data;
</script>

<h1>{initial.meta.total} {$t('entity.sub-category.plural.capitalize')}</h1>
