<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ProjectForm from '$lib/components/ProjectForm.svelte';
	import { projectCategories } from '$lib/data/portfolio';
	import { language } from '$lib/stores/language';
	import { admin } from '$lib/stores/admin';
	import { translations } from '$lib/translations';
	import { ArrowUpRight, Github, ExternalLink, Pencil, Plus, ShieldCheck, Trash2, Eye, EyeOff } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import type { Project } from '$lib/types';

	let { data } = $props();

	let visible = $state(false);
	let selectedCategory = $state('all');
	let showForm = $state(false);
	let editing = $state<Project | null>(null);
	let notice = $state('');
	let noticeError = $state('');

	const t = $derived(translations[$language].projects);

	const filteredProjects = $derived(
		selectedCategory === 'all'
			? data.projects
			: data.projects.filter((p) => p.category === selectedCategory)
	);

	onMount(() => {
		visible = true;
		admin.check();
	});

	// Reactively open the create/edit form from ?new=1 / ?edit=<id>
	$effect(() => {
		const sp = page.url.searchParams;
		if (sp.get('new') === '1') {
			openNew();
			history.replaceState(null, '', '/projects');
		} else if (sp.get('edit')) {
			const id = sp.get('edit');
			const p = data.projects.find((x) => x.id === id);
			if (p) openEdit(p);
			history.replaceState(null, '', '/projects');
		}
	});

	function openNew() {
		editing = null;
		showForm = true;
		notice = '';
		noticeError = '';
	}

	function openEdit(p: Project) {
		editing = p;
		showForm = true;
		notice = '';
		noticeError = '';
	}

	function closeForm() {
		showForm = false;
		editing = null;
	}

	async function onSaved() {
		showForm = false;
		editing = null;
		notice = 'Project berhasil disimpan ✅';
		await invalidateAll();
	}

	async function deleteProject(p: Project) {
		if (!confirm(`Hapus project "${p.title.en}"? Komentar terkait juga akan dihapus.`)) return;
		try {
			const res = await fetch(`/api/admin/projects/${p.id}`, { method: 'DELETE' });
			if (res.ok) {
				notice = `Project "${p.title.en}" dihapus 🗑️`;
				await invalidateAll();
			} else {
				noticeError = 'Gagal menghapus project';
			}
		} catch (e) {
			noticeError = 'Terjadi kesalahan, coba lagi.';
		}
	}

	async function togglePublish(p: Project) {
		try {
			await fetch(`/api/admin/projects/${p.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...p, published: !p.published })
			});
			await invalidateAll();
		} catch (e) {
			noticeError = 'Gagal mengubah status publish';
		}
	}
</script>

<svelte:head>
	<title>Projects - Raffa Yuda Pratama</title>
	<meta name="description" content="Explore projects built by Raffa Yuda Pratama — web apps, AI/ML, and more." />
</svelte:head>

<div class="min-h-screen page-enter">
	<Navbar />

	<main class="pt-24 pb-20">
		<div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			<!-- Header -->
			<div
				class="mb-12 transition-all duration-700"
				class:opacity-100={visible}
				class:translate-y-0={visible}
				class:opacity-0={!visible}
				class:translate-y-8={!visible}
			>
				<h1 class="mb-3 text-4xl font-bold md:text-5xl lg:text-6xl">
					{t.title.split(' ')[0]}<br />
					<span class="gradient-text">{t.title.split(' ').slice(1).join(' ')}</span>
				</h1>
				<p class="max-w-md text-sm text-muted-foreground">{t.subtitle}</p>

				<!-- Category pills -->
				<div class="mt-6 flex flex-wrap gap-2">
					{#each projectCategories as category}
						<button
							onclick={() => (selectedCategory = category.id)}
							class="rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300"
							class:bg-primary={selectedCategory === category.id}
							class:text-primary-foreground={selectedCategory === category.id}
							class:shadow-md={selectedCategory === category.id}
							class:glass-subtle={selectedCategory !== category.id}
						>
							{category.label[$language]}
						</button>
					{/each}
				</div>
			</div>

			<!-- Admin controls (only when logged in) -->
			{#if $admin.authenticated}
				<div class="mb-8">
					<div class="mb-3 flex flex-wrap items-center justify-between gap-3">
						<div class="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
							<ShieldCheck class="h-3.5 w-3.5" />
							Mode Admin — {data.projects.length} project
						</div>
						<button
							onclick={openNew}
							class="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
						>
							<Plus class="h-4 w-4" /> Tambah Project
						</button>
					</div>
					{#if notice}
						<div class="mb-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
							{notice}
						</div>
					{/if}
					{#if noticeError}
						<div class="mb-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-sm font-medium text-destructive">
							{noticeError}
						</div>
					{/if}
				</div>

				{#if showForm}
					{#key editing?.id ?? 'new'}
						<ProjectForm project={editing} onsaved={onSaved} oncancel={closeForm} />
					{/key}
				{/if}
			{/if}

			<!-- Editorial Project List -->
			<div class="space-y-0">
				{#each filteredProjects as project, i (project.id)}
					<a
						href="/projects/{project.slug}"
						class="project-row group relative block border-t border-border/40 transition-all duration-500"
						class:opacity-100={visible}
						class:translate-y-0={visible}
						class:opacity-0={!visible}
						class:translate-y-6={!visible}
						style="transition-delay: {i * 80}ms"
					>
						<div class="grid items-center gap-6 py-8 md:grid-cols-12 md:py-10">
							<!-- Number -->
							<div class="hidden md:col-span-1 md:block">
								<span class="text-4xl font-bold text-muted-foreground/30 transition-colors group-hover:text-primary/40">
									{String(i + 1).padStart(2, '0')}
								</span>
							</div>

							<!-- Image preview (appears on hover) -->
							<div class="relative overflow-hidden rounded-xl md:col-span-4">
								<div class="aspect-[16/10] overflow-hidden rounded-xl">
									<img
										src={project.image}
										alt={project.title[$language]}
										class="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
									/>
								</div>
								<!-- Floating year badge -->
								<div class="absolute top-3 left-3">
									<span class="rounded-lg bg-black/40 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
										{project.year}
									</span>
								</div>
							</div>

							<!-- Content -->
							<div class="md:col-span-5">
								<div class="mb-1 flex items-center gap-2 md:hidden">
									<span class="text-xs font-bold text-primary/60">{String(i + 1).padStart(2, '0')}</span>
									<span class="text-xs text-muted-foreground">·</span>
									<span class="text-xs text-muted-foreground">{project.category.toUpperCase()}</span>
								</div>

								<h2 class="mb-2 text-xl font-bold transition-colors group-hover:text-primary md:text-2xl">
									{project.title[$language]}
								</h2>

								<p class="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
									{project.description[$language]}
								</p>

								<!-- Tags - inline -->
								<div class="flex flex-wrap gap-1.5">
									{#each project.tags.slice(0, 5) as tag}
										<span class="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
											{tag}
										</span>
									{/each}
								</div>
							</div>

							<!-- Actions -->
							<div class="flex items-center gap-3 md:col-span-2 md:justify-end">
								{#if project.github}
									<button
										onclick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.github!, '_blank'); }}
										class="flex h-9 w-9 items-center justify-center rounded-xl border border-border/50 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
										aria-label="GitHub"
									>
										<Github class="h-4 w-4" />
									</button>
								{/if}
								{#if project.demo}
									<button
										onclick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.demo!, '_blank'); }}
										class="flex h-9 w-9 items-center justify-center rounded-xl border border-border/50 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
										aria-label="Demo"
									>
										<ExternalLink class="h-4 w-4" />
									</button>
								{/if}							{#if $admin.authenticated}
								<button
									onclick={(e) => { e.preventDefault(); e.stopPropagation(); openEdit(project); }}
									class="flex h-9 w-9 items-center justify-center rounded-xl border border-border/50 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
									aria-label="Edit project"
								>
									<Pencil class="h-4 w-4" />
								</button>
								<button
									onclick={(e) => { e.preventDefault(); e.stopPropagation(); togglePublish(project); }}
									class="flex h-9 w-9 items-center justify-center rounded-xl border border-border/50 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
									aria-label="Publish toggle"
									title={project.published ? 'Sembunyikan' : 'Publikasikan'}
								>
									{#if project.published}
										<Eye class="h-4 w-4" />
									{:else}
										<EyeOff class="h-4 w-4 text-amber-500" />
									{/if}
								</button>
								<button
									onclick={(e) => { e.preventDefault(); e.stopPropagation(); deleteProject(project); }}
									class="flex h-9 w-9 items-center justify-center rounded-xl border border-border/50 text-muted-foreground transition-all hover:border-destructive/40 hover:text-destructive"
									aria-label="Delete project"
								>
									<Trash2 class="h-4 w-4" />
								</button>
							{/if}								<div class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
									<ArrowUpRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
								</div>
							</div>
						</div>
					</a>
				{/each}

				<!-- Bottom border -->
				<div class="border-t border-border/40"></div>
			</div>

			{#if filteredProjects.length === 0}
				<div class="py-20 text-center">
					<p class="text-muted-foreground">No projects found in this category.</p>
				</div>
			{/if}
		</div>
	</main>

	<Footer />
</div>

<style>
	.project-row {
		position: relative;
	}

	.project-row::before {
		content: '';
		position: absolute;
		inset: 0;
		background: var(--glass-bg);
		opacity: 0;
		border-radius: 1rem;
		transition: opacity 0.4s ease;
		z-index: -1;
		margin: -0.5rem;
	}

	.project-row:hover::before {
		opacity: 1;
	}
</style>
