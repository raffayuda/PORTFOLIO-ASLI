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
	<title>Portfolio - Modern Web Developer</title>
	<meta name="description" content="Professional portfolio showcasing modern web development projects and skills" />
</svelte:head>

<div class="min-h-screen">
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
