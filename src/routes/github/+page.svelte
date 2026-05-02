<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CommentSection from '$lib/components/CommentSection.svelte';
	import { personalInfo } from '$lib/data/portfolio';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/translations';
	import { Github, Star, GitFork, ExternalLink, ChevronDown, ChevronUp } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let visible = $state(false);
	let repos = $state<any[]>([]);
	let contributions = $state<any>(null);
	let loading = $state(true);
	let totalStars = $state(0);
	let expandedRepo = $state<string | null>(null);

	const t = $derived(translations[$language].github);
	const username = personalInfo.github;

	onMount(async () => {
		visible = true;

		try {
			const res = await fetch(`/api/github/repos?sort=updated&per_page=12&username=${username}`);
			if (res.ok) {
				const data = await res.json();
				repos = data?.repos || [];
				totalStars = repos.reduce((sum: number, r: any) => sum + (r.stargazers_count || 0), 0);
			} else {
				console.error('Repos fetch failed:', res.status);
			}
		} catch (e) { 
			console.error('Repos error:', e); 
		}

		// Fetch contributions dengan retry dan timeout
		try {
			const res = await fetch(`/api/github/contributions?year=last&username=${username}`);
			if (res.ok) {
				const data = await res.json();
				contributions = data?.contributions || null;
				console.log('Contributions loaded:', contributions?.total?.lastYear);
			} else {
				console.error('Contributions fetch failed:', res.status);
			}
		} catch (e) { 
			console.error('Contributions error (this is normal if API is slow):', e); 
			// Fallback: show empty state gracefully
		}

		loading = false;
	});

	function getColor(count: number): string {
		if (count === 0) return 'var(--glass-border)';
		if (count <= 2) return 'oklch(0.685 0.169 222 / 0.3)';
		if (count <= 5) return 'oklch(0.685 0.169 222 / 0.55)';
		if (count <= 10) return 'oklch(0.685 0.169 222 / 0.75)';
		return 'oklch(0.685 0.169 222)';
	}

	function getLangColor(lang: string): string {
		const c: Record<string, string> = {
			JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
			PHP: '#4F5D95', HTML: '#e34c26', CSS: '#563d7c', Svelte: '#ff3e00',
			Vue: '#41b883', 'Jupyter Notebook': '#DA5B0B'
		};
		return c[lang] || '#8b949e';
	}
</script>

<svelte:head>
	<title>GitHub - Raffa Yuda Pratama</title>
	<meta name="description" content="Explore Raffa Yuda Pratama's GitHub repositories and contributions." />
</svelte:head>

<div class="min-h-screen page-enter">
	<Navbar />

	<main class="pt-24 pb-20">
		<div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			<!-- Header -->
			<div
				class="mb-10 transition-all duration-700"
				class:opacity-100={visible}
				class:translate-y-0={visible}
				class:opacity-0={!visible}
				class:translate-y-8={!visible}
			>
				<h1 class="mb-3 text-4xl font-bold md:text-5xl">
					{t.title.split(' ')[0]}
					<span class="gradient-text">{t.title.split(' ').slice(1).join(' ')}</span>
				</h1>
				<p class="text-sm text-muted-foreground">{t.subtitle}</p>

				<!-- Stats -->
				<div class="mt-6 flex flex-wrap gap-4">
					<div class="glass rounded-xl px-5 py-3 text-center">
						<p class="text-xl font-bold">{repos.length}</p>
						<p class="text-[10px] text-muted-foreground">{t.publicRepos}</p>
					</div>
					<div class="glass rounded-xl px-5 py-3 text-center">
						<p class="text-xl font-bold">{totalStars}</p>
						<p class="text-[10px] text-muted-foreground">{t.totalStars}</p>
					</div>
					<div class="glass rounded-xl px-5 py-3 text-center">
						<p class="text-xl font-bold">{contributions?.total?.lastYear || '—'}</p>
						<p class="text-[10px] text-muted-foreground">{t.contributions}</p>
					</div>
				</div>
			</div>

			<!-- Contribution Graph -->
			{#if contributions?.contributions}
				<div class="glass mb-10 overflow-hidden rounded-2xl p-5">
					<h2 class="mb-4 text-sm font-bold">{t.contributionGraph}</h2>
					<div class="overflow-x-auto">
						<div class="contrib-grid-full">
							{#each contributions.contributions as week}
								<div class="contrib-col">
									{#each week as day}
										<div class="contrib-cell" style="background: {getColor(day.count)};" title="{day.date}: {day.count}"></div>
									{/each}
								</div>
							{/each}
						</div>
					</div>
					<div class="mt-2.5 flex items-center justify-end gap-1 text-[10px] text-muted-foreground">
						<span>Less</span>
						{#each [0, 2, 5, 10, 15] as n}
							<div class="h-2.5 w-2.5 rounded-sm" style="background: {getColor(n)};"></div>
						{/each}
						<span>More</span>
					</div>
				</div>
			{:else if loading}
				<div class="glass mb-10 flex h-32 items-center justify-center rounded-2xl text-sm text-muted-foreground">Loading contributions...</div>
			{/if}

			<!-- Repositories -->
			<h2 class="mb-5 text-lg font-bold">{t.repositories}</h2>

			{#if loading}
				<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{#each Array(6) as _}
						<div class="glass h-36 animate-pulse rounded-2xl"></div>
					{/each}
				</div>
			{:else}
				<div class="space-y-3">
					{#each repos as repo}
						<div class="glass rounded-2xl transition-all duration-300">
							<!-- Repo Header -->
							<div class="flex items-center justify-between p-4">
								<div class="flex-1">
									<div class="flex items-center gap-3">
										<h3 class="text-sm font-bold">{repo.name}</h3>
										{#if repo.language}
											<span class="flex items-center gap-1 text-[10px] text-muted-foreground">
												<span class="h-2 w-2 rounded-full" style="background: {getLangColor(repo.language)};"></span>
												{repo.language}
											</span>
										{/if}
										<span class="flex items-center gap-0.5 text-[10px] text-muted-foreground">
											<Star class="h-3 w-3" />{repo.stargazers_count}
										</span>
										<span class="flex items-center gap-0.5 text-[10px] text-muted-foreground">
											<GitFork class="h-3 w-3" />{repo.forks_count}
										</span>
									</div>
									<p class="mt-1 text-xs text-muted-foreground">{repo.description || t.noDescription}</p>
								</div>

								<div class="flex items-center gap-2">
									<a href={repo.html_url} target="_blank" rel="noopener noreferrer"
										class="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-primary">
										<ExternalLink class="h-3.5 w-3.5" />
									</a>
									<button
										onclick={() => expandedRepo = expandedRepo === repo.name ? null : repo.name}
										class="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-primary"
									>
										{#if expandedRepo === repo.name}
											<ChevronUp class="h-4 w-4" />
										{:else}
											<ChevronDown class="h-4 w-4" />
										{/if}
									</button>
								</div>
							</div>

							<!-- Expandable Comment Section -->
							{#if expandedRepo === repo.name}
								<div class="border-t border-border/30 p-4">
									<CommentSection
										contextKey="github-{repo.name}"
										title="{$language === 'id' ? 'Komentar untuk' : 'Comments for'} {repo.name}"
									/>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			{/if}

			<!-- View on GitHub -->
			<div class="mt-8 text-center">
				<a href="https://github.com/{username}" target="_blank" rel="noopener noreferrer"
					class="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3">
					<Github class="h-4 w-4" />
					{t.viewOnGithub}
					<ExternalLink class="h-3.5 w-3.5" />
				</a>
			</div>
		</div>
	</main>

	<Footer />
</div>

<style>
	.contrib-grid-full {
		display: flex;
		gap: 3px;
		width: 100%;
		justify-content: space-between;
	}
	.contrib-col {
		display: flex;
		flex-direction: column;
		gap: 3px;
		flex: 1;
		min-width: 0;
	}
	.contrib-cell {
		width: 100%;
		aspect-ratio: 1;
		border-radius: 2px;
		transition: transform 0.15s ease, filter 0.15s ease;
		max-height: 14px;
	}
	.contrib-cell:hover {
		transform: scale(1.3);
		filter: brightness(1.3);
		z-index: 1;
		position: relative;
	}
</style>
