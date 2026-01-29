<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/logo-boday-black.png';
	import { theme } from '$lib/stores/theme';
	import SplashScreen from '$lib/components/SplashScreen.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { inject } from '@vercel/analytics';

	let { children } = $props();
	let showSplash = $state(false);
	let splashComplete = $state(false);

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
	{@render children()}
{/if}
