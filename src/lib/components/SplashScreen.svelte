<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let onComplete: () => void;

	let showSplash = true;
	let phase: 'text' | 'logo' | 'tagline' | 'exit' = 'text';
	let welcomeText = 'WELCOME';

	onMount(() => {
		// Phase 1: Welcome text (0-1.5s)
		setTimeout(() => {
			phase = 'logo';
		}, 1500);

		// Phase 2: Logo reveal (1.5-3.5s)
		setTimeout(() => {
			phase = 'tagline';
		}, 3500);

		// Phase 3: Exit (4.5s)
		setTimeout(() => {
			phase = 'exit';
		}, 4500);

		// Complete and hide splash (5s)
		setTimeout(() => {
			showSplash = false;
			onComplete();
		}, 5000);
	});
</script>

{#if showSplash}
	<div class="splash-screen" class:exit={phase === 'exit'} transition:fade={{ duration: 300 }}>
		<!-- Animated Background -->
		<div class="background">
			<div class="gradient-orb orb-1"></div>
			<div class="gradient-orb orb-2"></div>
			<div class="gradient-orb orb-3"></div>
		</div>

		<!-- Content Container -->
		<div class="content">
			<!-- Phase 1: Welcome Text -->
			{#if phase === 'text'}
				<div class="welcome-text">
					{#each welcomeText.split('') as letter, i}
						<span class="letter" style="--delay: {i * 0.1}s">{letter}</span>
					{/each}
				</div>
			{/if}

			<!-- Phase 2: Logo -->
			{#if phase === 'logo' || phase === 'tagline' || phase === 'exit'}
				<div class="logo-container" class:show-logo={phase !== 'text'}>
					<!-- Particle effects -->
					<div class="particles">
						{#each Array(20) as _, i}
							<div
								class="particle"
								style="--particle-delay: {i * 0.05}s; --particle-angle: {i * 18}deg"
							></div>
						{/each}
					</div>

					<!-- Logo with glow -->
					<div class="logo-wrapper">
						<div class="logo-glow"></div>
						<img src="/images/logo-boday-black.png" alt="R2B Logo" class="logo" />
					</div>
				</div>
			{/if}

			<!-- Phase 3: Tagline -->
			{#if phase === 'tagline' || phase === 'exit'}
				<div class="tagline">
					<span class="tagline-text">Full Stack Developer</span>
					<div class="tagline-line"></div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.splash-screen {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
	}

	.splash-screen.exit {
		animation: fadeOutSplash 0.5s ease-out forwards;
	}

	/* Animated Background */
	.background {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.gradient-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.3;
		animation: floatOrb 8s ease-in-out infinite;
	}

	.orb-1 {
		width: 500px;
		height: 500px;
		background: linear-gradient(135deg, #6366f1, #8b5cf6);
		top: -10%;
		left: -10%;
		animation-delay: 0s;
	}

	.orb-2 {
		width: 400px;
		height: 400px;
		background: linear-gradient(135deg, #ec4899, #f43f5e);
		bottom: -10%;
		right: -10%;
		animation-delay: 2s;
	}

	.orb-3 {
		width: 350px;
		height: 350px;
		background: linear-gradient(135deg, #3b82f6, #06b6d4);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation-delay: 4s;
	}

	/* Content */
	.content {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2rem;
	}

	/* Welcome Text Animation */
	.welcome-text {
		display: flex;
		gap: 0.5rem;
		font-size: 4rem;
		font-weight: 800;
		letter-spacing: 0.2em;
		color: #fff;
		text-shadow:
			0 0 30px rgba(99, 102, 241, 0.8),
			0 0 60px rgba(99, 102, 241, 0.4);
	}

	.letter {
		display: inline-block;
		animation: letterReveal 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
		animation-delay: var(--delay);
		opacity: 0;
		transform: translateY(50px) scale(0.5);
	}

	/* Logo Container */
	.logo-container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transform: scale(0) rotate(-180deg);
	}

	.logo-container.show-logo {
		animation: logoReveal 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
	}

	.logo-wrapper {
		position: relative;
		width: 280px;
		height: 280px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.logo {
		width: 100%;
		height: 100%;
		object-fit: contain;
		filter: drop-shadow(0 0 40px rgba(255, 255, 255, 0.5));
		animation: logoPulse 2s ease-in-out infinite;
		position: relative;
		z-index: 2;
	}

	.logo-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 300px;
		height: 300px;
		background: radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%);
		animation: glowPulse 2s ease-in-out infinite;
	}

	/* Particles */
	.particles {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.particle {
		position: absolute;
		width: 4px;
		height: 4px;
		background: #fff;
		border-radius: 50%;
		top: 50%;
		left: 50%;
		opacity: 0;
		animation: particleBurst 1s ease-out forwards;
		animation-delay: var(--particle-delay);
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
	}

	/* Tagline */
	.tagline {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		opacity: 0;
		animation: taglineReveal 0.6s ease-out 0.2s forwards;
	}

	.tagline-text {
		font-size: 1.75rem;
		font-weight: 600;
		color: #e2e8f0;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		text-shadow: 0 2px 20px rgba(99, 102, 241, 0.5);
	}

	.tagline-line {
		width: 0;
		height: 2px;
		background: linear-gradient(90deg, transparent, #6366f1, transparent);
		animation: lineExpand 0.8s ease-out 0.4s forwards;
		box-shadow: 0 0 10px rgba(99, 102, 241, 0.8);
	}

	/* Animations */
	@keyframes floatOrb {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(30px, -30px) scale(1.1);
		}
		66% {
			transform: translate(-20px, 20px) scale(0.9);
		}
	}

	@keyframes letterReveal {
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes logoReveal {
		0% {
			opacity: 0;
			transform: scale(0) rotate(-180deg);
		}
		60% {
			transform: scale(1.2) rotate(10deg);
		}
		100% {
			opacity: 1;
			transform: scale(1) rotate(0deg);
		}
	}

	@keyframes logoPulse {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
	}

	@keyframes glowPulse {
		0%,
		100% {
			opacity: 0.4;
			transform: translate(-50%, -50%) scale(1);
		}
		50% {
			opacity: 0.6;
			transform: translate(-50%, -50%) scale(1.1);
		}
	}

	@keyframes particleBurst {
		0% {
			opacity: 0;
			transform: translate(0, 0) scale(0);
		}
		20% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: translate(
					calc(cos(var(--particle-angle)) * 150px),
					calc(sin(var(--particle-angle)) * 150px)
				)
				scale(1);
		}
	}

	@keyframes taglineReveal {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes lineExpand {
		to {
			width: 250px;
		}
	}

	@keyframes fadeOutSplash {
		to {
			opacity: 0;
		}
	}

	/* Responsive */
	@media (max-width: 768px) {
		.welcome-text {
			font-size: 2.5rem;
			gap: 0.25rem;
		}

		.logo-wrapper {
			width: 200px;
			height: 200px;
		}

		.logo-glow {
			width: 220px;
			height: 220px;
		}

		.tagline-text {
			font-size: 1.25rem;
		}

		.gradient-orb {
			filter: blur(60px);
		}

		.orb-1 {
			width: 300px;
			height: 300px;
		}

		.orb-2 {
			width: 250px;
			height: 250px;
		}

		.orb-3 {
			width: 200px;
			height: 200px;
		}
	}

	@media (max-width: 480px) {
		.welcome-text {
			font-size: 2rem;
		}

		.logo-wrapper {
			width: 150px;
			height: 150px;
		}

		.tagline-text {
			font-size: 1rem;
		}
	}
</style>
