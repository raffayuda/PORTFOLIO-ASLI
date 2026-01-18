<script lang="ts">
	import { personalInfo, bio } from '$lib/data/portfolio';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/translations';
	import { User, MapPin, Mail, Heart } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let visible = $state(false);

	// Reactive translations
	const t = $derived(translations[$language].about);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visible = true;
					}
				});
			},
			{ threshold: 0.2 }
		);

		const section = document.querySelector('#about');
		if (section) observer.observe(section);

		return () => observer.disconnect();
	});

	const highlights = [
		{ icon: User, label: 'Professional Developer' },
		{ icon: Heart, label: 'Passionate Learner' },
		{ icon: MapPin, label: personalInfo.location }
	];
</script>

<section id="about" class="relative overflow-hidden py-12 md:py-20">
	<!-- Background Decoration -->
	<div class="absolute top-0 right-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"></div>
	<div class="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>

	<div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
		<div
			class="mb-8 text-center transition-all duration-700"
			class:opacity-100={visible}
			class:translate-y-0={visible}
			class:opacity-0={!visible}
			class:translate-y-10={!visible}
		>
			<h2 class="mb-2 text-2xl font-bold md:text-3xl">
				{t.title.split(' ')[0]}
				<span class="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
					>{t.title.split(' ').slice(1).join(' ')}</span
				>
			</h2>
			<p class="text-sm text-muted-foreground">{t.subtitle}</p>
		</div>

		<div class="mx-auto max-w-4xl">
			<div
				class="rounded-xl border border-border bg-card/50 p-6 shadow-xl backdrop-blur-sm transition-all delay-200 duration-700 md:p-8"
				class:opacity-100={visible}
				class:translate-y-0={visible}
				class:opacity-0={!visible}
				class:translate-y-10={!visible}
			>
				<div class="space-y-5">
					<p class="text-base leading-relaxed text-foreground/90">
						{bio[$language].intro}
					</p>

					<p class="text-base leading-relaxed text-foreground/90">
						{bio[$language].detail}
					</p>

					<!-- Highlights Grid -->
					<div class="mt-6 grid grid-cols-1 gap-3 border-t border-border pt-6 md:grid-cols-3">
						{#each highlights as highlight, i}
							<div
								class="flex items-center gap-2.5 rounded-lg bg-accent/50 p-3 transition-all duration-300 hover:scale-105 hover:bg-accent"
								style="transition-delay: {(i + 1) * 100}ms"
								class:opacity-100={visible}
								class:opacity-0={!visible}
							>
								<div class="rounded-lg bg-primary/10 p-1.5">
									<svelte:component this={highlight.icon} class="h-4 w-4 text-primary" />
								</div>
								<span class="text-sm font-medium">{highlight.label}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
