<script lang="ts">
	import { personalInfo } from '$lib/data/portfolio';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/translations';
	import { Github, Star, GitFork, ExternalLink, ArrowRight } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let visible = $state(false);
	let repos = $state<any[]>([]);
	let contributions = $state<any>(null);
	let totalContributions = $state(0);
	let graphContainer = $state<HTMLDivElement | null>(null);

	const t = $derived(translations[$language].github);
	const username = personalInfo.github;

	onMount(async () => {
		visible = true;

		try {
			const res = await fetch(`/api/github/repos?sort=pushed&per_page=4&username=${username}`);
			if (res.ok) {
				const data = await res.json();
				repos = data?.repos || [];
			}
		} catch (e) { console.error(e); }

		try {
			const res = await fetch(`/api/github/contributions?year=last&username=${username}`);
			if (res.ok) {
				const data = await res.json();
				contributions = data?.contributions || null;
				totalContributions = contributions?.total?.lastYear || 0;
			}
		} catch (e) { console.error(e); }
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

<section class="relative overflow-hidden py-16 md:py-24">
	<div class="relative z-10 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div
			class="mb-10 flex items-end justify-between transition-all duration-700"
			class:opacity-100={visible}
			class:translate-y-0={visible}
			class:opacity-0={!visible}
			class:translate-y-8={!visible}
		>
			<div>
				<div class="mb-2 flex items-center gap-2">
					<Github class="h-5 w-5 text-primary" />
					<h2 class="text-2xl font-bold md:text-3xl">GitHub</h2>
				</div>
				<p class="text-sm text-muted-foreground">
					{totalContributions} {t.contributions} · {repos.length}+ {t.repositories}
				</p>
			</div>
			<a
				href="/github"
				class="group hidden items-center gap-1.5 text-sm font-medium text-primary transition-all hover:gap-2.5 sm:flex"
			>
				{t.viewOnGithub}
				<ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
			</a>
		</div>

		<!-- Contribution Graph - Full Width -->
		{#if contributions?.contributions}
			<div
				class="glass mb-8 overflow-hidden rounded-2xl p-4 transition-all delay-100 duration-700"
				class:opacity-100={visible}
				class:opacity-0={!visible}
			>
				<div class="overflow-x-auto" bind:this={graphContainer}>
					<div class="contrib-grid-responsive">
						{#each contributions.contributions as week}
							<div class="contrib-col">
								{#each week as day}
									<div
										class="contrib-cell"
										style="background: {getColor(day.count)};"
										title="{day.date}: {day.count}"
									></div>
								{/each}
							</div>
						{/each}
					</div>
				</div>
				<div class="mt-2.5 flex items-center justify-end gap-1 text-[10px] text-muted-foreground">
					<span>Less</span>
					{#each [0, 2, 5, 10, 15] as n}
						<div class="h-2 w-2 rounded-sm" style="background: {getColor(n)};"></div>
					{/each}
					<span>More</span>
				</div>
			</div>
		{/if}

		<!-- Recent Repos -->
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each repos.slice(0, 4) as repo, i}
				<a
					href={repo.html_url}
					target="_blank"
					rel="noopener noreferrer"
					class="glass group rounded-2xl p-4 transition-all duration-500 hover:-translate-y-1"
					style="transition-delay: {(i + 2) * 60}ms"
					class:opacity-100={visible}
					class:translate-y-0={visible}
					class:opacity-0={!visible}
					class:translate-y-6={!visible}
				>
					<h3 class="mb-1.5 truncate text-sm font-bold transition-colors group-hover:text-primary">
						{repo.name}
					</h3>
					<p class="mb-3 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
						{repo.description || t.noDescription}
					</p>
					<div class="flex items-center gap-3 text-[11px] text-muted-foreground">
						{#if repo.language}
							<span class="flex items-center gap-1">
								<span class="h-2 w-2 rounded-full" style="background: {getLangColor(repo.language)};"></span>
								{repo.language}
							</span>
						{/if}
						<span class="flex items-center gap-0.5"><Star class="h-3 w-3" />{repo.stargazers_count}</span>
						<span class="flex items-center gap-0.5"><GitFork class="h-3 w-3" />{repo.forks_count}</span>
					</div>
				</a>
			{/each}
		</div>

		<!-- Mobile link -->
		<div class="mt-6 text-center sm:hidden">
			<a href="/github" class="text-sm font-medium text-primary">{t.viewOnGithub} →</a>
		</div>
	</div>
</section>

<style>
	.contrib-grid-responsive {
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
