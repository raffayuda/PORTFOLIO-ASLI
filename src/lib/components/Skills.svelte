<script lang="ts">
	import { skills } from '$lib/data/portfolio';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/translations';
	import { onMount } from 'svelte';

	let visible = $state(false);

	const t = $derived(translations[$language].skills);

	// Split skills into two rows
	const row1 = skills.slice(0, Math.ceil(skills.length / 2));
	const row2 = skills.slice(Math.ceil(skills.length / 2));

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) visible = true;
				});
			},
			{ threshold: 0.1 }
		);

		const section = document.querySelector('#skills');
		if (section) observer.observe(section);

		return () => observer.disconnect();
	});
</script>

<section id="skills" class="relative overflow-hidden py-16 md:py-24">
	<div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
		<div
			class="mb-10 text-center transition-all duration-700"
			class:opacity-100={visible}
			class:translate-y-0={visible}
			class:opacity-0={!visible}
			class:translate-y-8={!visible}
		>
			<h2 class="mb-2 text-2xl font-bold md:text-3xl">
				{t.title.split(' ')[0]}
				<span class="gradient-text">{t.title.split(' ').slice(1) ? t.title.split(' ').slice(1).join(' ') : ''}</span>
			</h2>
			<p class="text-sm text-muted-foreground">{t.subtitle}</p>
		</div>

		<!-- Marquee rows -->
		<div
			class="space-y-4 transition-all delay-200 duration-700"
			class:opacity-100={visible}
			class:opacity-0={!visible}
		>
			<!-- Row 1 - left to right -->
			<div class="marquee-container">
				<div class="marquee-track">
					{#each [...row1, ...row1] as skill}
						<div class="skill-chip glass-subtle">
							{#if skill.customSvg}
								{#if skill.name === 'Next.js'}
									<svg class="skill-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
										<path fill="currentColor" d="M18.974,31.5c0,0.828-0.671,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-14c0-0.653,0.423-1.231,1.045-1.43 c0.625-0.198,1.302,0.03,1.679,0.563l16.777,23.704C40.617,36.709,44,30.735,44,24c0-11-9-20-20-20S4,13,4,24s9,20,20,20 c3.192,0,6.206-0.777,8.89-2.122L18.974,22.216V31.5z M28.974,16.5c0-0.828,0.671-1.5,1.5-1.5s1.5,0.672,1.5,1.5v13.84l-3-4.227 V16.5z"></path>
									</svg>
								{:else if skill.name === 'Vercel'}
									<svg class="skill-svg" viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
									</svg>
								{:else if skill.name === 'Prisma'}
									<svg class="skill-svg" viewBox="0 0 256 310" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
										<path d="M254.313 235.519L148 9.749A17.063 17.063 0 0 0 133.473.037a16.87 16.87 0 0 0-15.533 8.052L2.633 194.848a17.465 17.465 0 0 0 .193 18.747L59.2 300.896a18.13 18.13 0 0 0 20.363 7.489l163.599-48.392a17.929 17.929 0 0 0 11.26-9.722 17.542 17.542 0 0 0-.101-14.76l-.008.008zm-23.802 9.683l-138.823 41.05a4.235 4.235 0 0 1-5.113-2.162l-47.534-75.633a4.28 4.28 0 0 1 .373-4.716L124.99 48.845a4.201 4.201 0 0 1 4.02-1.718 4.23 4.23 0 0 1 3.324 2.606l97.429 182.017a4.366 4.366 0 0 1 .549 4.456z" fill="currentColor"/>
									</svg>
								{/if}
							{:else if skill.devicon}
								<i class="{skill.devicon} skill-icon"></i>
							{/if}
							<span class="text-xs font-semibold whitespace-nowrap">{skill.name}</span>
						</div>
					{/each}
				</div>
			</div>

			<!-- Row 2 - right to left -->
			<div class="marquee-container">
				<div class="marquee-track reverse">
					{#each [...row2, ...row2] as skill}
						<div class="skill-chip glass-subtle">
							{#if skill.customSvg}
								{#if skill.name === 'Next.js'}
									<svg class="skill-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
										<path fill="currentColor" d="M18.974,31.5c0,0.828-0.671,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-14c0-0.653,0.423-1.231,1.045-1.43 c0.625-0.198,1.302,0.03,1.679,0.563l16.777,23.704C40.617,36.709,44,30.735,44,24c0-11-9-20-20-20S4,13,4,24s9,20,20,20 c3.192,0,6.206-0.777,8.89-2.122L18.974,22.216V31.5z M28.974,16.5c0-0.828,0.671-1.5,1.5-1.5s1.5,0.672,1.5,1.5v13.84l-3-4.227 V16.5z"></path>
									</svg>
								{:else if skill.name === 'Vercel'}
									<svg class="skill-svg" viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
									</svg>
								{:else if skill.name === 'Prisma'}
									<svg class="skill-svg" viewBox="0 0 256 310" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
										<path d="M254.313 235.519L148 9.749A17.063 17.063 0 0 0 133.473.037a16.87 16.87 0 0 0-15.533 8.052L2.633 194.848a17.465 17.465 0 0 0 .193 18.747L59.2 300.896a18.13 18.13 0 0 0 20.363 7.489l163.599-48.392a17.929 17.929 0 0 0 11.26-9.722 17.542 17.542 0 0 0-.101-14.76l-.008.008zm-23.802 9.683l-138.823 41.05a4.235 4.235 0 0 1-5.113-2.162l-47.534-75.633a4.28 4.28 0 0 1 .373-4.716L124.99 48.845a4.201 4.201 0 0 1 4.02-1.718 4.23 4.23 0 0 1 3.324 2.606l97.429 182.017a4.366 4.366 0 0 1 .549 4.456z" fill="currentColor"/>
									</svg>
								{/if}
							{:else if skill.devicon}
								<i class="{skill.devicon} skill-icon"></i>
							{/if}
							<span class="text-xs font-semibold whitespace-nowrap">{skill.name}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.marquee-container {
		overflow: hidden;
		mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
		-webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
	}

	.marquee-track {
		display: flex;
		gap: 1rem;
		width: max-content;
		animation: marquee 30s linear infinite;
	}

	.marquee-track.reverse {
		animation: marquee-reverse 30s linear infinite;
	}

	.marquee-container:hover .marquee-track {
		animation-play-state: paused;
	}

	.skill-chip {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.625rem 1rem;
		border-radius: 0.75rem;
		cursor: default;
		transition: all 0.3s ease;
		flex-shrink: 0;
	}

	.skill-chip:hover {
		transform: scale(1.05);
		border-color: oklch(0.685 0.169 222 / 0.4) !important;
	}

	.skill-icon {
		font-size: 1.25rem;
		color: var(--muted-foreground);
		transition: color 0.3s ease;
	}

	.skill-chip:hover .skill-icon {
		color: oklch(0.685 0.169 222);
	}

	.skill-svg {
		width: 1.25rem;
		height: 1.25rem;
		color: var(--muted-foreground);
		transition: color 0.3s ease;
	}

	.skill-chip:hover .skill-svg {
		color: oklch(0.685 0.169 222);
	}

	:global(.dark) .skill-chip:hover .skill-icon,
	:global(.dark) .skill-chip:hover .skill-svg {
		color: oklch(0.75 0.15 222);
	}
</style>
