<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import GitHubPreview from '$lib/components/GitHubPreview.svelte';
</script>

<svelte:head>
	<title>Raffa Yuda Pratama - Full Stack Developer Portfolio</title>
	<meta
		name="description"
		content="Full Stack Developer specializing in web development, mobile apps, and AI/ML solutions."
	/>
	{@html `
		<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Person",
			"name": "Raffa Yuda Pratama",
			"jobTitle": "Full Stack Developer",
			"url": "https://portfolio-asli.vercel.app",
			"email": "raffayudapratama20@gmail.com",
			"sameAs": [
				"https://github.com/raffayuda",
				"https://linkedin.com/in/raffayuda"
			]
		}
		<\/script>
	`}
</svelte:head>

<div class="min-h-screen page-enter">
	<Navbar />
	<main>
		<Hero />
		<GitHubPreview />
	</main>
	<Footer />
</div>
