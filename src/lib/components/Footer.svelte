<script lang="ts">
	import { personalInfo, socialLinks } from '$lib/data/portfolio';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/translations';
	import { Github, Linkedin, Twitter, Instagram, Mail } from '@lucide/svelte';

	const currentYear = new Date().getFullYear();

	// Reactive translations
	const t = $derived(translations[$language].footer);

	const socials = [
		{ icon: Github, href: socialLinks.github, label: 'GitHub' },
		{ icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
		{ icon: Twitter, href: socialLinks.twitter, label: 'Twitter' },
		{ icon: Instagram, href: socialLinks.instagram, label: 'Instagram' }
	];
</script>

<footer class="border-t border-border bg-card/50 backdrop-blur-sm">
	<div class="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
			<!-- About Section -->
			<div class="space-y-4">
				<h3 class="text-lg font-semibold">{personalInfo.name}</h3>
				<p class="text-sm text-muted-foreground">
					{personalInfo.title}
				</p>
				<div class="flex gap-4">
					{#each socials as social}
						<a
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							class="text-muted-foreground transition-colors hover:text-primary"
							aria-label={social.label}
						>
							<svelte:component this={social.icon} class="h-5 w-5" />
						</a>
					{/each}
				</div>
			</div>

			<!-- Quick Links -->
			<div class="space-y-4">
				<h3 class="text-lg font-semibold">{t.quickLinks}</h3>
				<ul class="space-y-2">
					<li>
						<a
							href="#home"
							class="text-sm text-muted-foreground transition-colors hover:text-primary"
						>
							{t.home}
						</a>
					</li>
					<li>
						<a
							href="#about"
							class="text-sm text-muted-foreground transition-colors hover:text-primary"
						>
							{t.about}
						</a>
					</li>
					<li>
						<a
							href="#projects"
							class="text-sm text-muted-foreground transition-colors hover:text-primary"
						>
							{t.projects}
						</a>
					</li>
					<li>
						<a
							href="#contact"
							class="text-sm text-muted-foreground transition-colors hover:text-primary"
						>
							{t.contact}
						</a>
					</li>
				</ul>
			</div>

			<!-- Contact Info -->
			<div class="space-y-4">
				<h3 class="text-lg font-semibold">{t.contactInfo}</h3>
				<ul class="space-y-2">
					<li class="flex items-center gap-2 text-sm text-muted-foreground">
						<Mail class="h-4 w-4" />
						<a href="mailto:{personalInfo.email}" class="transition-colors hover:text-primary">
							{personalInfo.email}
						</a>
					</li>
					<li class="text-sm text-muted-foreground">
						{personalInfo.location}
					</li>
				</ul>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div class="mt-12 border-t border-border pt-8">
			<div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
				<p class="text-sm text-muted-foreground">
					© {currentYear}
					{personalInfo.name}. {t.rights}.
				</p>
				<div class="flex gap-6">
					<a href="#" class="text-sm text-muted-foreground transition-colors hover:text-primary">
						{t.privacy}
					</a>
					<a href="#" class="text-sm text-muted-foreground transition-colors hover:text-primary">
						{t.terms}
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>
