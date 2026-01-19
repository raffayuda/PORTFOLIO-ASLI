<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/translations';
	import { Moon, Sun, Menu, X, Languages } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { personalInfo } from '$lib/data/portfolio';

	let isScrolled = $state(false);
	let isMobileMenuOpen = $state(false);
	let activeSection = $state('home');

	// Check if we're on the home page
	const isHomePage = $derived($page.url.pathname === '/');

	// Reactive translations
	const t = $derived(translations[$language].nav);

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 50;
		};

		window.addEventListener('scroll', handleScroll);

		// Intersection Observer for active section
		const observerOptions = {
			root: null,
			rootMargin: '-20% 0px -80% 0px',
			threshold: 0
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					activeSection = entry.target.id;
				}
			});
		}, observerOptions);

		// Observe all sections
		const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
		sections.forEach((id) => {
			const element = document.getElementById(id);
			if (element) observer.observe(element);
		});

		return () => {
			window.removeEventListener('scroll', handleScroll);
			observer.disconnect();
		};
	});

	function handleNavClick(e: MouseEvent, href: string) {
		e.preventDefault();
		isMobileMenuOpen = false;

		// If we're not on home page, navigate to home page with hash
		if (!isHomePage) {
			window.location.href = '/' + href;
			return;
		}

		const target = document.querySelector(href);
		if (target) {
			target.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<nav class="fixed top-0 right-0 left-0 z-50 py-4 transition-all duration-300">
	<div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-0">
		<!-- Desktop Navbar - Always Floating Pill -->
		<div class="hidden md:block">
			<div class="navbar-pill flex items-center justify-between rounded-full px-2 py-2 shadow-2xl">
				<!-- Left: Logo -->
				<a
					href="#home"
					onclick={(e) => handleNavClick(e, '#home')}
					class="logo-circle flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-transform hover:scale-110"
				>
					<span class="text-base font-bold">
						{#if $theme === 'dark'}
							<img src="images/logo-boday-white.png" alt="">
						{/if}
						{#if $theme === 'light'}
							<img src="images/logo-boday-black.png" alt="">
						{/if}
					</span>
				</a>

				<!-- Center: Nav Links -->
				<div class="flex items-center gap-0.5 px-2">
					<a
						href="#home"
						onclick={(e) => handleNavClick(e, '#home')}
						class="nav-link rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors {activeSection ===
						'home'
							? 'bg-primary/10 font-semibold text-primary'
							: ''}">{t.home}</a
					>
					<a
						href="#about"
						onclick={(e) => handleNavClick(e, '#about')}
						class="nav-link rounded-full px-4 py-2 font-medium whitespace-nowrap transition-colors {activeSection ===
						'about'
							? 'bg-primary/10 font-semibold text-primary'
							: ''}">{t.about}</a
					>
					<a
						href="#skills"
						onclick={(e) => handleNavClick(e, '#skills')}
						class="nav-link rounded-full px-4 py-2 font-medium whitespace-nowrap transition-colors {activeSection ===
						'skills'
							? 'bg-primary/10 font-semibold text-primary'
							: ''}">{t.skills}</a
					>
					<a
						href="#projects"
						onclick={(e) => handleNavClick(e, '#projects')}
						class="nav-link rounded-full px-4 py-2 font-medium whitespace-nowrap transition-colors {activeSection ===
						'projects'
							? 'bg-primary/10 font-semibold text-primary'
							: ''}">{t.projects}</a
					>
					<a
						href="#experience"
						onclick={(e) => handleNavClick(e, '#experience')}
						class="nav-link rounded-full px-4 py-2 font-medium whitespace-nowrap transition-colors {activeSection ===
						'experience'
							? 'bg-primary/10 font-semibold text-primary'
							: ''}">{t.experience}</a
					>
					<a
						href="#contact"
						onclick={(e) => handleNavClick(e, '#contact')}
						class="nav-link rounded-full px-4 py-2 font-medium whitespace-nowrap transition-colors {activeSection ===
						'contact'
							? 'bg-primary/10 font-semibold text-primary'
							: ''}">{t.contact}</a
					>
				</div>

				<!-- Right: Spotify + Language + Dark Mode + Email -->
				<div class="flex flex-shrink-0 items-center gap-1.5">
					<!-- Spotify Button -->
					<a
						href="/music"
						class="logo-circle flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-110"
						aria-label="Music Player"
						title="My Music Playlist"
					>
						<svg
							class="h-4 w-4"
							fill="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
							/>
						</svg>
					</a>

					<!-- Language Toggle -->
					<button
						onclick={() => language.toggle()}
						class="logo-circle flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-110"
						aria-label="Toggle language"
						title={$language === 'id' ? 'Switch to English' : 'Ganti ke Indonesia'}
					>
						<span class="text-sm font-medium">
							{$language === 'id' ? 'EN' : 'ID'}
						</span>
					</button>

					<!-- Dark Mode Toggle -->
					<button
						onclick={() => theme.toggle()}
						class="logo-circle flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-110"
						aria-label="Toggle theme"
					>
						{#if $theme === 'dark'}
							<Sun class="h-4 w-4" />
						{:else}
							<Moon class="h-4 w-4" />
						{/if}
					</button>

					<!-- Email Button -->
					<a
						href="mailto:{personalInfo.email}"
						class="email-button flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-transform hover:scale-105"
					>
						{t.email}
					</a>
				</div>
			</div>
		</div>

		<!-- Mobile Navbar -->
		<div
			class="mobile-nav flex items-center justify-between rounded-2xl px-4 py-3 shadow-lg md:hidden"
		>
			<a href="#home" onclick={(e) => handleNavClick(e, '#home')} class="text-xl font-bold"> 🚀 </a>

			<div class="flex items-center gap-2">
				<!-- Spotify Button -->
				<a
					href="/music"
					class="rounded-lg p-2 transition-colors hover:bg-muted"
					aria-label="Music Player"
				>
					<svg
						class="h-5 w-5"
						fill="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
						/>
					</svg>
				</a>

				<!-- Language Toggle -->
				<button
					onclick={() => language.toggle()}
					class="rounded-lg p-2 transition-colors hover:bg-muted"
					aria-label="Toggle language"
				>
					<span class="text-lg">
						{$language === 'id' ? '🇬🇧' : '🇮🇩'}
					</span>
				</button>

				<!-- Dark Mode Toggle -->
				<button
					onclick={() => theme.toggle()}
					class="rounded-lg p-2 transition-colors hover:bg-muted"
					aria-label="Toggle theme"
				>
					{#if $theme === 'dark'}
						<Sun class="h-5 w-5" />
					{:else}
						<Moon class="h-5 w-5" />
					{/if}
				</button>

				<button
					onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
					class="rounded-lg p-2 transition-colors hover:bg-muted"
					aria-label="Toggle menu"
				>
					{#if isMobileMenuOpen}
						<X class="h-6 w-6" />
					{:else}
						<Menu class="h-6 w-6" />
					{/if}
				</button>
			</div>
		</div>

		<!-- Mobile Menu -->
		{#if isMobileMenuOpen}
			<div class="mobile-menu mt-4 overflow-hidden rounded-2xl shadow-xl md:hidden">
				<div class="flex flex-col p-2">
					<a
						href="#home"
						onclick={(e) => {
							handleNavClick(e, '#home');
							isMobileMenuOpen = false;
						}}
						class="block rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-accent {activeSection ===
						'home'
							? 'bg-primary/10 font-semibold text-primary'
							: ''}">{t.home}</a
					>
					<a
						href="#about"
						onclick={(e) => {
							handleNavClick(e, '#about');
							isMobileMenuOpen = false;
						}}
						class="block rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-accent {activeSection ===
						'about'
							? 'bg-primary/10 font-semibold text-primary'
							: ''}">{t.about}</a
					>
					<a
						href="#skills"
						onclick={(e) => {
							handleNavClick(e, '#skills');
							isMobileMenuOpen = false;
						}}
						class="block rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-accent {activeSection ===
						'skills'
							? 'bg-primary/10 font-semibold text-primary'
							: ''}">{t.skills}</a
					>
					<a
						href="#projects"
						onclick={(e) => {
							handleNavClick(e, '#projects');
							isMobileMenuOpen = false;
						}}
						class="block rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-accent {activeSection ===
						'projects'
							? 'bg-primary/10 font-semibold text-primary'
							: ''}">{t.projects}</a
					>
					<a
						href="#experience"
						onclick={(e) => {
							handleNavClick(e, '#experience');
							isMobileMenuOpen = false;
						}}
						class="block rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-accent {activeSection ===
						'experience'
							? 'bg-primary/10 font-semibold text-primary'
							: ''}">{t.experience}</a
					>
					<a
						href="#contact"
						onclick={(e) => {
							handleNavClick(e, '#contact');
							isMobileMenuOpen = false;
						}}
						class="block rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-accent {activeSection ===
						'contact'
							? 'bg-primary/10 font-semibold text-primary'
							: ''}">{t.contact}</a
					>
					<a
						href="mailto:{personalInfo.email}"
						class="mt-2 rounded-xl bg-primary px-4 py-3 text-center font-medium text-primary-foreground"
					>
						{t.email}
					</a>
				</div>
			</div>
		{/if}
	</div>
</nav>

<style>
	/* Light Mode Styles */
	.navbar-pill {
		background: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border: 1px solid rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
	}

	.navbar-pill:hover {
		box-shadow: 0 20px 60px -15px rgba(0, 0, 0, 0.2);
	}

	.logo-circle {
		background: rgba(0, 0, 0, 0.05);
		color: inherit;
	}

	.nav-link {
		color: rgba(0, 0, 0, 0.7);
	}

	.nav-link:hover {
		color: rgba(0, 0, 0, 1);
		background: rgba(0, 0, 0, 0.05);
	}

	.email-button {
		background: rgba(0, 0, 0, 0.9);
		color: white;
	}

	.mobile-nav,
	.mobile-menu {
		background: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border: 1px solid rgba(0, 0, 0, 0.1);
	}

	/* Dark Mode Styles */
	:global(.dark) .navbar-pill {
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	:global(.dark) .navbar-pill:hover {
		box-shadow: 0 20px 60px -15px rgba(255, 255, 255, 0.1);
	}

	:global(.dark) .logo-circle {
		background: rgba(255, 255, 255, 0.1);
	}

	:global(.dark) .nav-link {
		color: rgba(255, 255, 255, 0.7);
	}

	:global(.dark) .nav-link:hover {
		color: rgba(255, 255, 255, 1);
		background: rgba(255, 255, 255, 0.1);
	}

	:global(.dark) .email-button {
		background: rgba(255, 255, 255, 0.9);
		color: black;
	}

	:global(.dark) .mobile-nav,
	:global(.dark) .mobile-menu {
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}
</style>
