<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/logo-boday-black.png';
	import { theme } from '$lib/stores/theme';
	import { language } from '$lib/stores/language';
	import SplashScreen from '$lib/components/SplashScreen.svelte';
	import AdminBar from '$lib/components/AdminBar.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { inject } from '@vercel/analytics';

	let { children } = $props();
	let showSplash = $state(false);
	let splashComplete = $state(false);

	// Sinkronkan atribut lang <html> dengan bahasa aktif (id/en)
	$effect(() => {
		if (browser) {
			document.documentElement.lang = $language === 'en' ? 'en' : 'id';
		}
	});

	onMount(() => {
		theme.init();

		// Initialize Vercel Analytics
		inject();

		// Check if user has seen splash screen before
		const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');

		if (!hasSeenSplash) {
			showSplash = true;
		} else {
			splashComplete = true;
		}
	});

	function handleSplashComplete() {
		if (browser) {
			sessionStorage.setItem('hasSeenSplash', 'true');
		}
		splashComplete = true;
	}
</script>

<svelte:head
	><link rel="icon" href={favicon} />
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
	/>
</svelte:head>

{#if showSplash && !splashComplete}
	<SplashScreen onComplete={handleSplashComplete} />
{/if}

{#if splashComplete || !showSplash}
	<div class="animated-bg" aria-hidden="true"></div>
	<div class="pointer-events-none fixed inset-0 z-[-1]">
		<div class="dot-pattern absolute inset-0 opacity-40"></div>
		
		<!-- Animated gradient orbs -->
		<div class="hero-orb hero-orb-1"></div>
		<div class="hero-orb hero-orb-2"></div>
		<div class="hero-orb hero-orb-3"></div>
		
		<!-- Floating particles -->
		<div class="hero-particles">
			{#each Array(6) as _, i}
				<div class="hero-particle" style="--delay: {i * 0.8}s; --x: {15 + i * 14}%; --size: {3 + (i % 3) * 2}px;"></div>
			{/each}
		</div>
	</div>
	{@render children()}
	<AdminBar />
{/if}
