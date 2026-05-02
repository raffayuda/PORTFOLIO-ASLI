<script lang="ts">
	import { personalInfo, socialLinks } from '$lib/data/portfolio';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/translations';
	import { Github, Linkedin, Twitter, Instagram, Mail } from '@lucide/svelte';

	const currentYear = new Date().getFullYear();
	const t = $derived(translations[$language].footer);

	const socials = [
		{ icon: Github, href: socialLinks.github, label: 'GitHub' },
		{ icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
		{ icon: Twitter, href: socialLinks.twitter, label: 'Twitter' },
		{ icon: Instagram, href: socialLinks.instagram, label: 'Instagram' }
	];
</script>

<footer class="relative overflow-hidden border-t border-border/50">
	<div class="pointer-events-none absolute inset-x-0 top-0 h-px"
		style="background: linear-gradient(90deg, transparent, oklch(0.685 0.169 222 / 0.3), transparent);"
	></div>

	<div class="glass-subtle">
		<div class="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
			<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
				<div class="space-y-4 lg:col-span-1">
					<h3 class="text-base font-bold">{personalInfo.name}</h3>
					<p class="text-xs leading-relaxed text-muted-foreground">{personalInfo.title}</p>
					<div class="flex gap-2.5">
						{#each socials as social}
							{@const Icon = social.icon}
							<a href={social.href} target="_blank" rel="noopener noreferrer"
								class="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all hover:text-primary"
								aria-label={social.label}
							>
								<Icon class="h-4 w-4" />
							</a>
						{/each}
					</div>
				</div>

				<div class="space-y-3">
					<h3 class="text-sm font-bold">{t.quickLinks}</h3>
					<ul class="space-y-2">
						<li><a href="/" class="text-xs text-muted-foreground hover:text-primary">{t.home}</a></li>
						<li><a href="/about" class="text-xs text-muted-foreground hover:text-primary">{t.about}</a></li>
						<li><a href="/projects" class="text-xs text-muted-foreground hover:text-primary">{t.projects}</a></li>
						<li><a href="/contact" class="text-xs text-muted-foreground hover:text-primary">{t.contact}</a></li>
					</ul>
				</div>

				<div class="space-y-3">
					<h3 class="text-sm font-bold">{t.services}</h3>
					<ul class="space-y-2">
						{#each [t.webDev, t.uiDesign, t.consulting, t.codeReview] as service}
							<li><a href="/about" class="text-xs text-muted-foreground hover:text-primary">{service}</a></li>
						{/each}
					</ul>
				</div>

				<div class="space-y-3">
					<h3 class="text-sm font-bold">{t.contactInfo}</h3>
					<ul class="space-y-2">
						<li class="flex items-center gap-2 text-xs text-muted-foreground">
							<Mail class="h-3.5 w-3.5" />
							<a href="mailto:{personalInfo.email}" class="hover:text-primary">{personalInfo.email}</a>
						</li>
						<li class="text-xs text-muted-foreground">{personalInfo.location}</li>
					</ul>
				</div>
			</div>

			<div class="mt-10 border-t border-border/50 pt-6">
				<div class="flex flex-col items-center justify-between gap-3 sm:flex-row">
					<p class="text-xs text-muted-foreground">© {currentYear} {personalInfo.name}. {t.rights}.</p>
					<div class="flex gap-5">
						<a href="/about" class="text-xs text-muted-foreground hover:text-primary">{t.privacy}</a>
						<a href="/about" class="text-xs text-muted-foreground hover:text-primary">{t.terms}</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</footer>
