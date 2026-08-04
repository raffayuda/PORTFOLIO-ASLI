<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import GitHubPreview from '$lib/components/GitHubPreview.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { SITE_URL, SITE_NAME } from '$lib/config';
	import { personalInfo } from '$lib/data/portfolio';

	const personJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		'name': personalInfo.name,
		'jobTitle': personalInfo.title,
		'url': SITE_URL,
		'email': personalInfo.email,
		'image': `${SITE_URL}/images/OG-Image.png`,
		'sameAs': [
			'https://github.com/raffayuda',
			'https://linkedin.com/in/raffayuda',
			'https://twitter.com/raffayuda',
			'https://instagram.com/raffayudapratama06'
		]
	};

	const websiteJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'name': SITE_NAME,
		'url': SITE_URL
	};
</script>

<Seo
	title="Raffa Yuda Pratama - Full Stack Developer & Problem Solver"
	description="Portofolio Raffa Yuda Pratama, Fullstack Developer & Problem Solver dari Bogor, Indonesia. Spesialis web development, mobile apps, dan solusi AI/ML dengan React, Next.js, SvelteKit, dan Node.js."
	path="/"
	jsonLd={[personJsonLd, websiteJsonLd]}
/>

<svelte:head>
	<link rel="preload" as="image" href="/images/boday-ganteng.png" fetchpriority="high" />
</svelte:head>

<div class="min-h-screen page-enter">
	<Navbar />
	<main>
		<Hero />
		<GitHubPreview />
	</main>
	<Footer />
</div>
