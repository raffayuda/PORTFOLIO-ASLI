<script lang="ts">
	import { services } from '$lib/data/portfolio';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/translations';
	import * as LucideIcons from '@lucide/svelte';
	import { ArrowRight } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let visible = $state(false);

	const t = $derived(translations[$language].services);

	// Show first 4 services on homepage
	const previewServices = services.slice(0, 4);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) visible = true;
				});
			},
			{ threshold: 0.1 }
		);

		const section = document.querySelector('#services-preview');
		if (section) observer.observe(section);

		return () => observer.disconnect();
	});
</script>

<section id="services-preview" class="relative overflow-hidden py-16 md:py-24">
	<div class="pointer-events-none absolute inset-0">
		<div
			class="absolute bottom-0 left-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full opacity-10 blur-[100px]"
			style="background: linear-gradient(135deg, #06b6d4, #0ea5e9);"
		></div>
	</div>

	<div class="relative z-10 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<div
			class="mb-10 text-center transition-all duration-700"
			class:opacity-100={visible}
			class:translate-y-0={visible}
			class:opacity-0={!visible}
			class:translate-y-8={!visible}
		>
			<h2 class="mb-2 text-2xl font-bold md:text-3xl">
				{t.title.split(' ')[0]}
				<span class="gradient-text">{t.title.split(' ').slice(1).join(' ')}</span>
			</h2>
			<p class="text-sm text-muted-foreground">{t.subtitle}</p>
		</div>

		<div class="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each previewServices as service, i}
				{@const Icon = LucideIcons[service.icon as keyof typeof LucideIcons]}
				<div
					class="glass group rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1"
					style="transition-delay: {i * 80}ms"
					class:opacity-100={visible}
					class:translate-y-0={visible}
					class:opacity-0={!visible}
					class:translate-y-8={!visible}
				>
					<div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
						{#if Icon}
							<Icon class="h-5 w-5 text-primary" />
						{/if}
					</div>
					<h3 class="mb-2 text-sm font-bold">{service.title[$language]}</h3>
					<p class="text-xs leading-relaxed text-muted-foreground">
						{service.description[$language]}
					</p>
				</div>
			{/each}
		</div>

		<!-- View All Link -->
		<div
			class="mt-8 text-center transition-all delay-300 duration-700"
			class:opacity-100={visible}
			class:opacity-0={!visible}
		>
			<a
				href="/services"
				class="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-all hover:gap-3"
			>
				{t.viewAll}
				<ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
			</a>
		</div>
	</div>
</section>
