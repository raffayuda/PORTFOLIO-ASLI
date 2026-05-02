<script lang="ts">
	import { projects, projectCategories } from '$lib/data/portfolio';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/translations';
	import { Github, ExternalLink, ArrowRight } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let visible = $state(false);
	let selectedCategory = $state('all');

	const t = $derived(translations[$language].projects);

	const filteredProjects = $derived(
		selectedCategory === 'all' ? projects : projects.filter((p) => p.category === selectedCategory)
	);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) visible = true;
				});
			},
			{ threshold: 0.1 }
		);

		const section = document.querySelector('#projects');
		if (section) observer.observe(section);

		return () => observer.disconnect();
	});
</script>

<section id="projects" class="relative overflow-hidden py-16 md:py-24">
	<div class="pointer-events-none absolute inset-0">
		<div
			class="absolute top-1/3 left-0 h-[350px] w-[350px] rounded-full opacity-12 blur-[100px]"
			style="background: linear-gradient(135deg, #0ea5e9, #06b6d4);"
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

		<!-- Category Filter -->
		<div
			class="mb-10 flex flex-wrap justify-center gap-2 transition-all delay-100 duration-700"
			class:opacity-100={visible}
			class:opacity-0={!visible}
		>
			{#each projectCategories as category}
				<button
					onclick={() => (selectedCategory = category.id)}
					class="rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300"
					class:bg-primary={selectedCategory === category.id}
					class:text-primary-foreground={selectedCategory === category.id}
					class:shadow-lg={selectedCategory === category.id}
				>
					{#if selectedCategory !== category.id}
						<span class="glass-subtle rounded-full">{category.label[$language]}</span>
					{:else}
						{category.label[$language]}
					{/if}
				</button>
			{/each}
		</div>

		<!-- Projects Grid -->
		<div class="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
			{#each filteredProjects as project, i (project.id)}
				<a
					href="/projects/{project.slug}"
					class="project-card glass group overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2"
					in:scale={{ duration: 400, delay: i * 60, easing: quintOut, start: 0.95 }}
					out:scale={{ duration: 200, easing: quintOut, start: 0.95 }}
				>
					<!-- Project Image -->
					<div class="relative h-44 overflow-hidden">
						<img
							src={project.image}
							alt={project.title[$language]}
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

						<!-- Quick links overlay -->
						<div class="absolute top-3 right-3 flex gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
							{#if project.github}
								<button
									onclick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.github, '_blank'); }}
									class="flex h-8 w-8 items-center justify-center rounded-lg bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
									aria-label="GitHub"
								>
									<Github class="h-3.5 w-3.5" />
								</button>
							{/if}
							{#if project.demo}
								<button
									onclick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.demo, '_blank'); }}
									class="flex h-8 w-8 items-center justify-center rounded-lg bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
									aria-label="Demo"
								>
									<ExternalLink class="h-3.5 w-3.5" />
								</button>
							{/if}
						</div>

						<!-- Year badge -->
						<div class="absolute bottom-3 left-3">
							<span class="rounded-md bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-sm">
								{project.year}
							</span>
						</div>
					</div>

					<!-- Project Details -->
					<div class="p-5">
						<div class="mb-2 flex items-center justify-between">
							<h3 class="text-base font-bold transition-colors group-hover:text-primary">
								{project.title[$language]}
							</h3>
							<ArrowRight class="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
						</div>

						<p class="mb-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
							{project.description[$language]}
						</p>

						<!-- Tech Stack Tags -->
						<div class="flex flex-wrap gap-1.5">
							{#each project.tags.slice(0, 4) as tag}
								<span class="rounded-md bg-primary/8 px-2 py-0.5 text-[10px] font-medium text-primary">
									{tag}
								</span>
							{/each}
							{#if project.tags.length > 4}
								<span class="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
									+{project.tags.length - 4}
								</span>
							{/if}
						</div>
					</div>
				</a>
			{/each}
		</div>

		{#if filteredProjects.length === 0}
			<div class="py-12 text-center">
				<p class="text-sm text-muted-foreground">No projects found in this category.</p>
			</div>
		{/if}
	</div>
</section>

<style>
	.project-card {
		cursor: pointer;
	}

	.project-card:hover {
		box-shadow: 0 20px 60px -15px oklch(0.685 0.169 222 / 0.15);
	}

	:global(.dark) .project-card:hover {
		box-shadow: 0 20px 60px -15px oklch(0.75 0.15 222 / 0.1);
	}
</style>
