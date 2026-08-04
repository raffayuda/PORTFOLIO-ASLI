<script lang="ts">
	import { page } from '$app/state';
	import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, DEFAULT_IMAGE } from '$lib/config';

	type JsonLd = Record<string, unknown> | Record<string, unknown>[];

	let {
		title = SITE_TITLE,
		description = SITE_DESCRIPTION,
		path,
		image = DEFAULT_IMAGE,
		type = 'website',
		noindex = false,
		jsonLd = null
	}: {
		title?: string;
		description?: string;
		path?: string;
		image?: string;
		type?: string;
		noindex?: boolean;
		jsonLd?: JsonLd | null;
	} = $props();

	const canonical = $derived(`${SITE_URL}${path ?? page.url.pathname}`);
	const imageUrl = $derived(image.startsWith('http') ? image : `${SITE_URL}${image}`);
	const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : '';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
	<link rel="canonical" href={canonical} />

	<!-- Open Graph -->
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:locale" content="id_ID" />
	<meta property="og:locale:alternate" content="en_US" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={canonical} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />

	{#if jsonLdString}
		{@html `<script type="application/ld+json">${jsonLdString}</script>`}
	{/if}
</svelte:head>
