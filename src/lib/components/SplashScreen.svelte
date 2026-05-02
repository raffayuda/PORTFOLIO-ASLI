<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { theme } from '$lib/stores/theme';

	let { onComplete }: { onComplete: () => void } = $props();

	let showSplash = $state(true);
	let progress = $state(0);
	let currentTheme = $state<'light' | 'dark'>('dark');

	theme.subscribe((value) => {
		currentTheme = value;
	});

	const logoPath = $derived(
		currentTheme === 'dark' ? '/images/logo-boday-white.png' : '/images/logo-boday-black.png'
	);

	onMount(() => {
		// Smooth progress animation
		const duration = 2200;
		const start = performance.now();

		function animateProgress(now: number) {
			const elapsed = now - start;
			progress = Math.min((elapsed / duration) * 100, 100);

			if (elapsed < duration) {
				requestAnimationFrame(animateProgress);
			} else {
				// Finish
				setTimeout(() => {
					showSplash = false;
					onComplete();
				}, 300);
			}
		}

		requestAnimationFrame(animateProgress);
	});
</script>

{#if showSplash}
	<div
		class="splash-screen"
		class:light={currentTheme === 'light'}
		class:fade-out={progress >= 100}
		transition:fade={{ duration: 300 }}
	>
		<div class="splash-content">
			<!-- Logo -->
			<div class="logo-wrap" class:visible={progress > 5}>
				<img src={logoPath} alt="Logo" class="splash-logo" />
			</div>

			<!-- Progress bar -->
			<div class="progress-track" class:visible={progress > 5}>
				<div class="progress-fill" style="width: {progress}%"></div>
			</div>

			<!-- Subtitle -->
			<p class="splash-label" class:visible={progress > 10}>
				Full Stack Developer
			</p>
		</div>
	</div>
{/if}

<style>
	.splash-screen {
		position: fixed;
		inset: 0;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #0a0f1a;
		transition: opacity 0.4s ease;
	}

	.splash-screen.light {
		background: #f8fafb;
	}

	.splash-screen.fade-out {
		opacity: 0;
	}

	.splash-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}

	.logo-wrap {
		opacity: 0;
		transform: scale(0.9);
		transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.logo-wrap.visible {
		opacity: 1;
		transform: scale(1);
	}

	.splash-logo {
		width: 100px;
		height: 100px;
		object-fit: contain;
	}

	.progress-track {
		width: 180px;
		height: 3px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 4px;
		overflow: hidden;
		opacity: 0;
		transition: opacity 0.4s ease;
	}

	.progress-track.visible {
		opacity: 1;
	}

	.splash-screen.light .progress-track {
		background: rgba(0, 0, 0, 0.08);
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #0ea5e9, #06b6d4);
		border-radius: 4px;
		transition: width 0.1s linear;
	}

	.splash-label {
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 0.8rem;
		font-weight: 500;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.4);
		opacity: 0;
		transform: translateY(5px);
		transition: all 0.5s ease;
	}

	.splash-label.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.splash-screen.light .splash-label {
		color: rgba(15, 23, 42, 0.4);
	}

	@media (max-width: 768px) {
		.splash-logo {
			width: 72px;
			height: 72px;
		}

		.progress-track {
			width: 140px;
		}
	}
</style>
