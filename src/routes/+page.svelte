<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Raffa Yuda Pratama - Full Stack Developer Portfolio</title>
	<meta
		name="description"
		content="Full Stack Developer specializing in web development, mobile apps, and AI/ML solutions. Explore my projects and get in touch."
	/>

	<!-- Structured Data (JSON-LD) -->
	{@html `
		<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Person",
			"name": "Raffa Yuda Pratama",
			"jobTitle": "Full Stack Developer",
			"description": "Full Stack Developer specializing in web development, mobile apps, and AI/ML solutions",
			"url": "https://portfolio-asli.vercel.app",
			"email": "raffayudapratama20@gmail.com",
			"sameAs": [
				"https://github.com/raffayuda",
				"https://linkedin.com/in/raffayuda",
				"https://twitter.com/raffayuda",
				"https://instagram.com/raffayuda"
			],
			"knowsAbout": ["Web Development", "Mobile Development", "AI/ML", "Full Stack Development"],
			"alumniOf": {
				"@type": "Organization",
				"name": "Your University"
			}
		}
		<\/script>
	`}
</svelte:head>

<div class="min-h-screen bg-background">
	<Navbar />
	<main>
		<Hero />
		<About />
		<Skills />
		<Projects />
		<Experience />
		<Contact />
	</main>
	<Footer />
</div>
