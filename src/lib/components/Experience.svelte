<script lang="ts">
	import { experience } from '$lib/data/portfolio';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/translations';
	import * as LucideIcons from '@lucide/svelte';
	import { onMount } from 'svelte';

	let visible = $state(false);

	// Reactive translations
	const t = $derived(translations[$language].experience);

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

		const section = document.querySelector('#experience');
		if (section) observer.observe(section);

		return () => observer.disconnect();
	});
</script>

<section id="experience" class="bg-muted/30 py-12 md:py-20">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div
			class="mb-8 text-center transition-all duration-700"
			class:opacity-100={visible}
			class:translate-y-0={visible}
			class:opacity-0={!visible}
			class:translate-y-10={!visible}
		>
			<h2 class="mb-2 text-2xl font-bold md:text-3xl">
				{t.title.split(' ')[0]} &
				<span class="bg-gradient-to-r dark:from-white from-black to-blue-600 bg-clip-text text-transparent"
					>{t.title.split(' & ')[1]}</span
				>
			</h2>
			<p class="text-sm text-muted-foreground">{t.subtitle}</p>
		</div>

		<div class="mx-auto max-w-4xl">
			<!-- Timeline -->
			<div class="relative">
				<!-- Timeline Line -->
				<div
					class="absolute top-0 bottom-0 left-8 w-0.5 bg-gradient-to-b from-purple-600 via-blue-600 to-purple-600 md:left-1/2"
				></div>

				<div class="space-y-10">
					{#each experience as item, i}
						{@const Icon = LucideIcons[item.icon as keyof typeof LucideIcons]}
						<div
							class="relative transition-all duration-700"
							style="transition-delay: {i * 200}ms"
							class:opacity-100={visible}
							class:translate-x-0={visible}
							class:opacity-0={!visible}
							class:translate-x-10={!visible && i % 2 === 0}
							class:-translate-x-10={!visible && i % 2 !== 0}
						>
							<!-- Timeline Dot -->
							<div
								class="absolute left-8 z-10 -ml-3 flex h-6 w-6 items-center justify-center rounded-full border-4 border-background bg-primary md:left-1/2"
							>
								{#if Icon}
									<svelte:component this={Icon} class="h-3 w-3 text-primary-foreground" />
								{/if}
							</div>

							<!-- Content Card -->
							<div
								class="ml-20 md:ml-0 md:w-[calc(50%-3rem)]"
								class:md:ml-auto={i % 2 === 0}
								class:md:text-right={i % 2 !== 0}
								class:md:mr-auto={i % 2 !== 0}
							>
								<div
									class="group rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
								>
									<span
										class="mb-2 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
									>
										{typeof item.period === 'object' ? item.period[$language] : item.period}
									</span>

									<h3 class="mb-1 text-lg font-bold transition-colors group-hover:text-primary">
										{typeof item.title === 'object' ? item.title[$language] : item.title}
									</h3>

									<div
										class="mb-3 flex items-center gap-2 text-muted-foreground"
										class:md:justify-end={i % 2 !== 0}
									>
										<span class="font-medium">{item.company}</span>
										<span>•</span>
										<span>{item.location}</span>
									</div>

									<p class="text-sm leading-relaxed text-foreground/80">
										{typeof item.description === 'object'
											? item.description[$language]
											: item.description}
									</p>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
