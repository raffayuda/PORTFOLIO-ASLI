<script lang="ts">
	import { projects, projectCategories } from '$lib/data/portfolio';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/translations';
	import { Github, ExternalLink } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let visible = $state(false);
	let selectedCategory = $state('all');

	// Reactive translations
	const t = $derived(translations[$language].projects);

	const filteredProjects = $derived(
		selectedCategory === 'all' ? projects : projects.filter((p) => p.category === selectedCategory)
	);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visible = true;
					}
				});
			},
			{ threshold: 0.1 }
		);

		const section = document.querySelector('#projects');
		if (section) observer.observe(section);

		return () => observer.disconnect();
	});
</script>

<section id="projects" class="relative overflow-hidden py-12 md:py-20">
	<!-- Background Decoration -->
	<div class="absolute top-1/4 left-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"></div>

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
				<span class="bg-gradient-to-r dark:from-white from-black to-blue-600 bg-clip-text text-transparent"
					>{t.title.split(' ').slice(1).join(' ')}</span
				>
			</h2>
			<p class="text-sm text-muted-foreground">{t.subtitle}</p>
		</div>

		<!-- Category Filter -->
		<div
			class="mb-12 flex flex-wrap justify-center gap-3 transition-all delay-200 duration-700"
			class:opacity-100={visible}
			class:opacity-0={!visible}
		>
			{#each projectCategories as category}
				<button
					onclick={() => (selectedCategory = category.id)}
					class="rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300"
					class:bg-primary={selectedCategory === category.id}
					class:text-primary-foreground={selectedCategory === category.id}
					class:bg-accent={selectedCategory !== category.id}
					class:text-foreground={selectedCategory !== category.id}
				>
					{category.label[$language]}
				</button>
			{/each}
		</div>

		<!-- Projects Grid -->
		<div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each filteredProjects as project, i (project.id)}
				<div
					class="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
					in:scale={{ duration: 400, delay: i * 50, easing: quintOut, start: 0.9 }}
					out:scale={{ duration: 200, easing: quintOut, start: 0.9 }}
				>
					<!-- Project Image -->
					<div
						class="relative h-40 overflow-hidden bg-gradient-to-br from-purple-500/20 to-blue-500/20"
					>
						<div
							class="absolute inset-0 flex items-center justify-center text-6xl font-bold text-muted-foreground/20"
						>
							<img src={project.image} alt={project.title[$language]}>
						</div>
						<!-- Overlay on hover -->
						<div
							class="absolute inset-0 flex items-end justify-center gap-3 bg-gradient-to-t from-black/60 to-transparent pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						>
						{#if project.github}
							<a
								href={project.github}
								target="_blank"
								rel="noopener noreferrer"
								class="rounded-lg bg-white/90 p-1.5 transition-colors hover:bg-white"
								aria-label="View on GitHub"
							>
								<Github class="h-4 w-4 text-black" />
							</a>
						{/if}
						{#if project.demo}
							<a
								href={project.demo}
								target="_blank"
								rel="noopener noreferrer"
								class="rounded-lg bg-white/90 p-1.5 transition-colors hover:bg-white"
								aria-label="View demo"
							>
								<ExternalLink class="h-4 w-4 text-black" />
							</a>
						{/if}
						</div>
					</div>

					<!-- Project Details -->
					<div class="space-y-3 p-5">
						<h3 class="text-lg font-bold transition-colors group-hover:text-primary">
							{project.title[$language]}
						</h3>

						<p class="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
							{project.description[$language]}
						</p>

						<!-- Tech Stack Tags -->
						<div class="flex flex-wrap gap-2">
							{#each project.tags as tag}
								<span
									class="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
								>
									{tag}
								</span>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>

		{#if filteredProjects.length === 0}
			<div class="py-12 text-center">
				<p class="text-lg text-muted-foreground">No projects found in this category.</p>
			</div>
		{/if}
	</div>
</section>
