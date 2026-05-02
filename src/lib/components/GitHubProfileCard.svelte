<script lang="ts">
	import { onMount } from 'svelte';
	import { Github, Users, Heart, GitFork } from '@lucide/svelte';
	import type { UserStats } from '$lib/utils/github';
	import { getUserStats, formatDate } from '$lib/utils/github';
	import { personalInfo } from '$lib/data/portfolio';

	let userStats: UserStats | null = $state(null);
	let loading = $state(true);
	let error = $state<string | null>(null);

	const username = personalInfo.github;

	onMount(async () => {
		try {
			userStats = await getUserStats(username);
			if (!userStats) {
				error = 'Gagal memuat profil GitHub';
			}
		} catch (e) {
			error = 'Terjadi kesalahan saat memuat data';
		} finally {
			loading = false;
		}
	});

	$effect(() => {
		if (loading) return;
		// Profile card animations can be added here
	});
</script>

<div class="glass rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl">
	<div class="p-6 space-y-6">
		<!-- Header -->
		<div class="flex items-center gap-4 pb-4 border-b border-glass-border">
			<a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" class="flex-shrink-0">
				<img
					src={`https://avatars.githubusercontent.com/${username}?size=100`}
					alt={username}
					class="w-16 h-16 rounded-full border-2 border-primary hover:scale-110 transition-transform"
					loading="lazy"
				/>
			</a>

			<div class="flex-1 min-w-0">
				<h3 class="text-lg font-bold truncate">
					<a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors">
						@{username}
					</a>
				</h3>
				<p class="text-xs text-muted-foreground">GitHub Profile</p>
			</div>

			<a
				href={`https://github.com/${username}`}
				target="_blank"
				rel="noopener noreferrer"
				class="flex-shrink-0 text-primary hover:bg-primary/10 p-2 rounded-lg transition-colors"
			>
				<Github class="w-5 h-5" />
			</a>
		</div>

		<!-- Stats Grid -->
		{#if loading}
			<div class="space-y-3">
				{#each Array(4) as _}
					<div class="h-10 bg-glass-border/50 rounded-lg animate-pulse"></div>
				{/each}
			</div>
		{:else if error}
			<div class="text-sm text-muted-foreground text-center py-4">
				{error}
			</div>
		{:else if userStats}
			<div class="grid grid-cols-2 gap-3">
				<div class="bg-background/50 rounded-lg p-3 text-center">
					<p class="text-lg font-bold text-primary">{userStats.public_repos}</p>
					<p class="text-xs text-muted-foreground">Repositories</p>
				</div>
				<div class="bg-background/50 rounded-lg p-3 text-center">
					<p class="text-lg font-bold text-primary">{userStats.followers}</p>
					<p class="text-xs text-muted-foreground">Followers</p>
				</div>
				<div class="bg-background/50 rounded-lg p-3 text-center">
					<p class="text-lg font-bold text-primary">{userStats.following}</p>
					<p class="text-xs text-muted-foreground">Following</p>
				</div>
				<div class="bg-background/50 rounded-lg p-3 text-center">
					<p class="text-lg font-bold text-primary">{new Date(userStats.created_at).getFullYear()}</p>
					<p class="text-xs text-muted-foreground">Member Since</p>
				</div>
			</div>

			<!-- CTA Button -->
			<a
				href={`https://github.com/${username}?tab=repositories`}
				target="_blank"
				rel="noopener noreferrer"
				class="block w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg font-medium text-sm text-center hover:bg-primary/90 transition-colors"
			>
				View All Repos
			</a>
		{/if}
	</div>
</div>

<style>
	:global(.glass-border) {
		border-color: var(--glass-border, rgba(255, 255, 255, 0.1));
	}
</style>
