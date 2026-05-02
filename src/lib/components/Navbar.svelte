<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/translations';
	import { Moon, Sun, Menu, X } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { personalInfo } from '$lib/data/portfolio';

	let isScrolled = $state(false);
	let isMobileMenuOpen = $state(false);

	const t = $derived(translations[$language].nav);

	const navLinks = $derived([
		{ href: '/', label: t.home },
		{ href: '/about', label: t.about },
		{ href: '/skills', label: t.skills },
		{ href: '/projects', label: t.projects },
		{ href: '/gallery', label: t.gallery },
		{ href: '/github', label: t.repository },
		{ href: '/contact', label: t.contact }
	]);

	function isActive(href: string): boolean {
		if (href === '/') return $page.url.pathname === '/';
		return $page.url.pathname.startsWith(href);
	}

	onMount(() => {
		const handleScroll = () => { isScrolled = window.scrollY > 50; };
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<nav class="fixed top-0 right-0 left-0 z-50 py-3 transition-all duration-300">
	<div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-0">
		<!-- Desktop Navbar -->
		<div class="hidden md:block">
			<div class="navbar-pill flex items-center justify-between rounded-2xl px-2 py-1.5">
				<!-- Logo -->
				<a href="/" class="nav-icon-btn flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl transition-transform hover:scale-110">
					{#if $theme === 'dark'}
						<img src="/images/logo-boday-white.png" alt="Logo" class="h-6 w-6 object-contain" />
					{:else}
						<img src="/images/logo-boday-black.png" alt="Logo" class="h-6 w-6 object-contain" />
					{/if}
				</a>

				<!-- Nav Links -->
				<div class="flex items-center gap-0.5 px-1">
					{#each navLinks as link}
						<a
							href={link.href}
							class="nav-link rounded-lg px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-all"
							class:active={isActive(link.href)}
						>
							{link.label}
						</a>
					{/each}
				</div>

				<!-- Right Actions -->
				<div class="flex flex-shrink-0 items-center gap-1">
					<a href="/music" class="nav-icon-btn flex h-8 w-8 items-center justify-center rounded-xl transition-transform hover:scale-110" aria-label="Music">
						<svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
					</a>
					<button onclick={() => language.toggle()} class="nav-icon-btn flex h-8 w-8 items-center justify-center rounded-xl transition-transform hover:scale-110" aria-label="Toggle language">
						<span class="text-xs font-semibold">{$language === 'id' ? 'EN' : 'ID'}</span>
					</button>
					<button onclick={() => theme.toggle()} class="nav-icon-btn flex h-8 w-8 items-center justify-center rounded-xl transition-transform hover:scale-110" aria-label="Toggle theme">
						{#if $theme === 'dark'}<Sun class="h-3.5 w-3.5" />{:else}<Moon class="h-3.5 w-3.5" />{/if}
					</button>
					<a href="mailto:{personalInfo.email}" class="email-btn ml-1 flex items-center rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-transform hover:scale-105">
						{t.email}
					</a>
				</div>
			</div>
		</div>

		<!-- Mobile Navbar -->
		<div class="mobile-nav flex items-center justify-between rounded-2xl px-4 py-2.5 md:hidden">
			<a href="/">
				{#if $theme === 'dark'}
					<img src="/images/logo-boday-white.png" class="w-8" alt="Logo" />
				{:else}
					<img src="/images/logo-boday-black.png" class="w-8" alt="Logo" />
				{/if}
			</a>
			<div class="flex items-center gap-1.5">
				<button onclick={() => language.toggle()} class="rounded-lg p-2 text-xs font-semibold hover:bg-muted">{$language === 'id' ? 'EN' : 'ID'}</button>
				<button onclick={() => theme.toggle()} class="rounded-lg p-2 hover:bg-muted">
					{#if $theme === 'dark'}<Sun class="h-4 w-4" />{:else}<Moon class="h-4 w-4" />{/if}
				</button>
				<button onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)} class="rounded-lg p-2 hover:bg-muted">
					{#if isMobileMenuOpen}<X class="h-5 w-5" />{:else}<Menu class="h-5 w-5" />{/if}
				</button>
			</div>
		</div>

		{#if isMobileMenuOpen}
			<div class="mobile-menu mt-2 overflow-hidden rounded-2xl md:hidden">
				<div class="flex flex-col p-2">
					{#each navLinks as link}
						<a
							href={link.href}
							onclick={() => (isMobileMenuOpen = false)}
							class="block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
							class:text-primary={isActive(link.href)}
						>{link.label}</a>
					{/each}
					<div class="my-1 h-px bg-border/50"></div>
					<a href="/music" onclick={() => (isMobileMenuOpen = false)} class="block rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-accent">Music</a>
					<a href="mailto:{personalInfo.email}" class="mt-2 rounded-xl bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground">{t.email}</a>
				</div>
			</div>
		{/if}
	</div>
</nav>

<style>
	.navbar-pill {
		background: var(--glass-bg);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid var(--glass-border);
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
	}
	.nav-icon-btn { background: rgba(0, 0, 0, 0.04); color: inherit; }
	.nav-link { color: var(--muted-foreground); }
	.nav-link:hover { color: var(--foreground); background: rgba(0, 0, 0, 0.04); }
	.nav-link.active { color: oklch(0.685 0.169 222); background: oklch(0.685 0.169 222 / 0.1); font-weight: 600; }
	.email-btn { background: var(--foreground); color: var(--background); }
	.mobile-nav, .mobile-menu {
		background: var(--glass-bg);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid var(--glass-border);
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
	}
	:global(.dark) .nav-icon-btn { background: rgba(255, 255, 255, 0.08); }
	:global(.dark) .nav-link:hover { color: var(--foreground); background: rgba(255, 255, 255, 0.08); }
	:global(.dark) .nav-link.active { color: oklch(0.75 0.15 222); background: oklch(0.75 0.15 222 / 0.12); }
</style>
