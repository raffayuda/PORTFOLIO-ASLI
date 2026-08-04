<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CommentSection from '$lib/components/CommentSection.svelte';
	import { language } from '$lib/stores/language';
	import { admin } from '$lib/stores/admin';
	import { translations } from '$lib/translations';
	import { Github, ExternalLink, ArrowLeft, ArrowRight, Calendar, Tag, CheckCircle2, Pencil } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let { data } = $props();
	let visible = $state(false);

	const t = $derived(translations[$language].projectDetail);

	onMount(() => {
		visible = true;
		window.scrollTo(0, 0);
		admin.check();
	});
</script>

<svelte:head>
	{#if data.project}
		<title>{data.project.title[$language]} - Raffa Yuda Pratama</title>
		<meta name="description" content={data.project.description[$language]} />
	{:else}
		<title>Project Not Found</title>
	{/if}
</svelte:head>

<div class="min-h-screen bg-background page-enter">
	<Navbar />

	<main class="pt-24 pb-20">
		{#if data.project}
			{@const project = data.project}
			<div class="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
				<!-- Back button -->
				<a href="/projects" class="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
					<ArrowLeft class="h-4 w-4" />
					{t.backToProjects}
				</a>

				<!-- Hero Image -->
				<div
					class="glass mb-8 overflow-hidden rounded-2xl transition-all duration-700"
					class:opacity-100={visible}
					class:opacity-0={!visible}
				>
					<img src={project.image} alt={project.title[$language]} class="h-auto w-full object-cover" style="max-height: 420px;" />
				</div>

				<!-- Title & Meta -->
				<div class="mb-8" class:opacity-100={visible} class:opacity-0={!visible}>
					<h1 class="mb-3 text-2xl font-bold md:text-3xl">{project.title[$language]}</h1>
					<div class="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
						<span class="flex items-center gap-1.5"><Calendar class="h-3.5 w-3.5" />{t.year}: {project.year}</span>
						<span class="flex items-center gap-1.5"><Tag class="h-3.5 w-3.5" />{project.category.toUpperCase()}</span>
					</div>
					<div class="flex flex-wrap gap-3">
						{#if $admin.authenticated}
							<a
								href="/projects?edit={project.id}"
								class="glass inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold hover:border-primary/30"
							>
								<Pencil class="h-4 w-4" />Edit
							</a>
						{/if}
						{#if project.demo}
							<a href={project.demo} target="_blank" rel="noopener noreferrer"
								class="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:shadow-lg hover:shadow-primary/25">
								<ExternalLink class="h-4 w-4" />{t.viewDemo}
							</a>
						{/if}
						{#if project.github}
							<a href={project.github} target="_blank" rel="noopener noreferrer"
								class="glass inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold hover:border-primary/30">
								<Github class="h-4 w-4" />{t.viewCode}
							</a>
						{/if}
					</div>
				</div>

				<!-- Content Grid -->
				<div class="mb-12 grid gap-5 md:grid-cols-3">
					<div class="glass rounded-2xl p-6 md:col-span-2">
						<h2 class="mb-3 text-base font-bold">{t.overview}</h2>
						<p class="text-sm leading-relaxed text-foreground/80">
							{project.longDescription?.[$language] || project.description[$language]}
						</p>
					</div>
					<div class="space-y-4">
						<div class="glass rounded-2xl p-5">
							<h3 class="mb-3 text-sm font-bold">{t.techStack}</h3>
							<div class="flex flex-wrap gap-2">
								{#each project.tags as tag}
									<span class="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">{tag}</span>
								{/each}
							</div>
						</div>
						{#if project.features}
							<div class="glass rounded-2xl p-5">
								<h3 class="mb-3 text-sm font-bold">{t.features}</h3>
								<ul class="space-y-2">
									{#each project.features[$language] as feature}
										<li class="flex items-start gap-2 text-xs text-foreground/80">
											<CheckCircle2 class="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
											{feature}
										</li>
									{/each}
								</ul>
							</div>
						{/if}
					</div>
				</div>

				<!-- Comment Section -->
				<div class="glass rounded-2xl p-6">
					<CommentSection
						contextKey={`project-${project.slug}`}
						title={$language === 'id' ? 'Komentar untuk proyek ini' : 'Comments for this project'}
					/>
				</div>

				<!-- Prev/Next Navigation -->
				<div class="mt-10 flex items-center justify-between border-t border-border/50 pt-6">
					{#if data.prevProject}
						<a href="/projects/{data.prevProject.slug}" class="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
							<ArrowLeft class="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
							<span class="hidden sm:inline">{t.prevProject}</span>
						</a>
					{:else}<div></div>{/if}
					{#if data.nextProject}
						<a href="/projects/{data.nextProject.slug}" class="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
							<span class="hidden sm:inline">{t.nextProject}</span>
							<ArrowRight class="h-4 w-4 group-hover:translate-x-1 transition-transform" />
						</a>
					{:else}<div></div>{/if}
				</div>
			</div>
		{:else}
			<div class="container mx-auto max-w-4xl px-4 py-20 text-center">
				<h1 class="mb-4 text-2xl font-bold">{t.notFound}</h1>
				<a href="/projects" class="text-sm text-primary hover:underline">{t.backToProjects}</a>
			</div>
		{/if}
	</main>

	<Footer />
</div>
