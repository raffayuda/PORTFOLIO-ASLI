<script lang="ts">
	import { experience } from '$lib/data/portfolio';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/translations';
	import * as LucideIcons from '@lucide/svelte';
	import { onMount } from 'svelte';

	let visible = $state(false);

	const t = $derived(translations[$language].experience);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) visible = true;
				});
			},
			{ threshold: 0.1 }
		);

		const section = document.querySelector('#experience');
		if (section) observer.observe(section);

		return () => observer.disconnect();
	});
</script>

<section id="experience" class="relative overflow-hidden py-16 md:py-24">
	<div class="relative z-10 container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
		<div
			class="mb-10 text-center transition-all duration-700"
			class:opacity-100={visible}
			class:translate-y-0={visible}
			class:opacity-0={!visible}
			class:translate-y-8={!visible}
		>
			<h2 class="mb-2 text-2xl font-bold md:text-3xl">
				{t.title.split(' & ')[0]} &
				<span class="gradient-text">{t.title.split(' & ')[1]}</span>
			</h2>
			<p class="text-sm text-muted-foreground">{t.subtitle}</p>
		</div>

		<div class="relative">
			<!-- Timeline Line -->
			<div class="absolute top-0 bottom-0 left-8 w-px md:left-1/2"
				style="background: linear-gradient(to bottom, transparent, oklch(0.685 0.169 222 / 0.4), oklch(0.715 0.143 199 / 0.4), transparent);"
			></div>

			<div class="space-y-8">
				{#each experience as item, i}
					{@const Icon = LucideIcons[item.icon as keyof typeof LucideIcons]}
					<div
						class="relative transition-all duration-700"
						style="transition-delay: {i * 150}ms"
						class:opacity-100={visible}
						class:translate-y-0={visible}
						class:opacity-0={!visible}
						class:translate-y-8={!visible}
					>
						<!-- Timeline Dot -->
						<div
							class="absolute left-8 z-10 -ml-3 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-primary shadow-md md:left-1/2"
							style="box-shadow: 0 0 12px oklch(0.685 0.169 222 / 0.3);"
						>
							{#if Icon}
								<Icon class="h-3 w-3 text-primary-foreground" />
							{/if}
						</div>

						<!-- Content Card -->
						<div
							class="ml-16 md:ml-0 md:w-[calc(50%-2.5rem)]"
							class:md:ml-auto={i % 2 === 0}
							class:md:text-right={i % 2 !== 0}
							class:md:mr-auto={i % 2 !== 0}
						>
							<div class="glass group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1">
								<span class="mb-2 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
									{typeof item.period === 'object' ? item.period[$language] : item.period}
								</span>

								<h3 class="mb-1 text-base font-bold transition-colors group-hover:text-primary">
									{typeof item.title === 'object' ? item.title[$language] : item.title}
								</h3>

								<div
									class="mb-2 flex items-center gap-2 text-xs text-muted-foreground"
									class:md:justify-end={i % 2 !== 0}
								>
									<span class="font-medium">{item.company}</span>
									<span>•</span>
									<span>{item.location}</span>
								</div>

								<p class="text-xs leading-relaxed text-foreground/75">
									{typeof item.description === 'object' ? item.description[$language] : item.description}
								</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
