<script lang="ts">
	import { skills } from '$lib/data/portfolio';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/translations';
	import { onMount } from 'svelte';
	import SkillIcon from '$lib/components/SkillIcon.svelte';

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
							<SkillIcon {skill} />
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
							<SkillIcon {skill} />
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

	:global(.skill-chip:hover .skill-icon),
	:global(.skill-chip:hover .skill-svg) {
		color: oklch(0.685 0.169 222);
	}

	:global(.dark) .skill-chip:hover .skill-icon,
	:global(.dark) .skill-chip:hover .skill-svg {
		color: oklch(0.75 0.15 222);
	}
</style>
