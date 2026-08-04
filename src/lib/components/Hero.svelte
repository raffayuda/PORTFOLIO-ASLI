<script lang="ts">
	import { personalInfo } from '$lib/data/portfolio';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/translations';
	import { Mail, ArrowRight, MapPin, Sparkles } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let mounted = $state(false);

	const techStack = ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js', 'SvelteKit'];

	const t = $derived(translations[$language].hero);

	onMount(() => {
		mounted = true;
	});
</script>

<section
	id="home"
	class="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-28 pb-12 sm:px-6 lg:px-8"
>
	<div class="relative z-10 container mx-auto max-w-6xl">
		<!-- Bento Grid -->
		<div class="grid gap-4 md:grid-cols-3 md:grid-rows-[auto_auto] lg:gap-5">
			<!-- Main intro card (spans 2 cols) -->
			<div class="glass hero-card-1 rounded-2xl p-6 md:col-span-2 md:p-8 lg:p-10">
				<!-- Availability Badge -->
				<div class="hero-badge mb-5 inline-flex items-center gap-2 rounded-full border border-border/50 bg-primary/10 px-3.5 py-1.5">
					<span class="relative flex h-2 w-2">
						<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
						<span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
					</span>
					<span class="text-xs font-medium text-primary">{t.badge}</span>
				</div>

				<h1 class="hero-title mb-4 text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-5xl">
					{t.heading}
				</h1>

				<p class="hero-desc mb-6 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg">
					{t.description}
				</p>

				<!-- CTA Buttons -->
				<div class="hero-cta flex flex-wrap gap-3">
					<a
						href="/projects"
						class="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
					>
						{t.ctaPrimary}
						<ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
					</a>

					<a
						href="/contact"
						class="glass inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 hover:border-primary/30 hover:-translate-y-0.5"
					>
						<Mail class="h-4 w-4" />
						{t.ctaSecondary}
					</a>
				</div>
			</div>

			<!-- Photo card -->
			<div class="glass hero-card-2 group overflow-hidden rounded-2xl">
				<div class="relative h-full min-h-[240px] md:min-h-0">
					<img
						src="/images/boday-ganteng.png"
						alt="Raffa Yuda Pratama - Full Stack Developer"
						width="640"
						height="800"
						fetchpriority="high"
						decoding="async"
						class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					/>
					<div
						class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
					></div>
					<div class="absolute right-0 bottom-0 left-0 p-4">
						<p class="text-sm font-semibold text-white">{personalInfo.name}</p>
						<p class="text-xs text-white/70">{personalInfo.title}</p>
					</div>
				</div>
			</div>

			<!-- Location card -->
			<div class="glass hero-card-3 flex items-center gap-3 rounded-2xl p-5">
				<div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
					<MapPin class="h-5 w-5 text-primary" />
				</div>
				<div>
					<p class="text-xs text-muted-foreground">{t.location}</p>
					<p class="text-sm font-semibold">{personalInfo.location}</p>
				</div>
			</div>

			<!-- Tech stack card (spans 2 cols) -->
			<div class="glass hero-card-4 rounded-2xl p-5 md:col-span-2">
				<div class="mb-3 flex items-center gap-2">
					<Sparkles class="h-4 w-4 text-primary" />
					<p class="text-xs font-medium text-muted-foreground">{t.techStack}</p>
				</div>
				<div class="flex flex-wrap gap-2">
					{#each techStack as tech, i}
						<span
							class="tech-pill glass-subtle rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-300 hover:border-primary/40 hover:text-primary hover:-translate-y-0.5"
							style="animation-delay: {0.6 + i * 0.08}s"
						>
							{tech}
						</span>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Tech pill stagger animation */
	.tech-pill {
		opacity: 0;
		animation: heroSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
		animation-delay: inherit;
	}

	@keyframes heroSlideUp {
		from { opacity: 0; transform: translateY(10px); }
		to { opacity: 1; transform: translateY(0); }
	}
</style>
