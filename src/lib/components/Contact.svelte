<script lang="ts">
	import { personalInfo, socialLinks } from '$lib/data/portfolio';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/translations';
	import { Mail, MapPin, Github, Linkedin, Twitter, Instagram, Send } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let visible = $state(false);
	let formData = $state({
		name: '',
		email: '',
		message: ''
	});
	let formSubmitted = $state(false);
	let isSubmitting = $state(false);

	// Reactive translations
	const t = $derived(translations[$language].contact);

	const socials = [
		{ icon: Github, href: socialLinks.github, label: 'GitHub' },
		{ icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
		{ icon: Twitter, href: socialLinks.twitter, label: 'Twitter' },
		{ icon: Instagram, href: socialLinks.instagram, label: 'Instagram' }
	];

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visible = true;
					}
				});
			},
			{ threshold: 0.2 }
		);

		const section = document.querySelector('#contact');
		if (section) observer.observe(section);

		return () => observer.disconnect();
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		isSubmitting = true;

		// Simulate form submission
		await new Promise((resolve) => setTimeout(resolve, 1500));

		formSubmitted = true;
		isSubmitting = false;

		// Reset form after 3 seconds
		setTimeout(() => {
			formSubmitted = false;
			formData = { name: '', email: '', message: '' };
		}, 3000);
	}
</script>

<section id="contact" class="relative overflow-hidden py-12 md:py-20">
	<!-- Background Decoration -->
	<div class="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
	<div class="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"></div>

	<div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
		<div
			class="mb-8 text-center transition-all duration-700"
			class:opacity-100={visible}
			class:translate-y-0={visible}
			class:opacity-0={!visible}
			class:translate-y-10={!visible}
		>
			<h2 class="mb-2 text-2xl font-bold md:text-3xl">
				{t.title.split(' ')[0]}
				{t.title.split(' ')[1]}
				<span class="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
					>{t.title.split(' ').slice(2).join(' ')}</span
				>
			</h2>
			<p class="text-sm text-muted-foreground">{t.subtitle}</p>
		</div>

		<div class="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
			<!-- Contact Info -->
			<div
				class="space-y-6 transition-all delay-200 duration-700"
				class:opacity-100={visible}
				class:translate-x-0={visible}
				class:opacity-0={!visible}
				class:-translate-x-10={!visible}
			>
				<div class="space-y-5 rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm">
					<h3 class="mb-4 text-xl font-bold">{t.contactInfo}</h3>

					<div class="space-y-4">
						<div class="group flex items-center gap-4">
							<div
								class="rounded-lg bg-primary/10 p-2.5 transition-colors group-hover:bg-primary/20"
							>
								<Mail class="h-4 w-4 text-primary" />
							</div>
							<div>
								<p class="text-xs text-muted-foreground">{t.email}</p>
								<a
									href="mailto:{personalInfo.email}"
									class="font-medium transition-colors hover:text-primary"
								>
									{personalInfo.email}
								</a>
							</div>
						</div>

						<div class="group flex items-center gap-4">
							<div
								class="rounded-lg bg-primary/10 p-2.5 transition-colors group-hover:bg-primary/20"
							>
								<MapPin class="h-4 w-4 text-primary" />
							</div>
							<div>
								<p class="text-xs text-muted-foreground">{t.location}</p>
								<p class="font-medium">{personalInfo.location}</p>
							</div>
						</div>
					</div>

					<!-- Social Links -->
					<div class="border-t border-border pt-6">
						<p class="mb-3 text-xs text-muted-foreground">{t.followMe}</p>
						<div class="flex gap-3">
							{#each socials as social}
								<a
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									class="rounded-lg bg-accent p-2.5 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground"
									aria-label={social.label}
								>
									<svelte:component this={social.icon} class="h-4 w-4" />
								</a>
							{/each}
						</div>
					</div>
				</div>
			</div>

			<!-- Contact Form -->
			<div
				class="transition-all delay-400 duration-700"
				class:opacity-100={visible}
				class:translate-x-0={visible}
				class:opacity-0={!visible}
				class:translate-x-10={!visible}
			>
				<form
					onsubmit={handleSubmit}
					class="space-y-5 rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm"
				>
					{#if formSubmitted}
						<div class="flex h-full items-center justify-center py-12">
							<div class="animate-in space-y-4 text-center fade-in">
								<div
									class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10"
								>
									<Send class="h-8 w-8 text-green-500" />
								</div>
								<h3 class="text-lg font-bold text-green-500">{t.successTitle}</h3>
								<p class="text-sm text-muted-foreground">{t.successMessage}</p>
							</div>
						</div>
					{:else}
						<div class="space-y-4">
							<div>
								<label for="name" class="mb-1.5 block text-xs font-medium">{t.name}</label>
								<input
									id="name"
									type="text"
									bind:value={formData.name}
									required
									class="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm transition-all focus:ring-2 focus:ring-primary focus:outline-none"
									placeholder={t.namePlaceholder}
								/>
							</div>

							<div>
								<label for="email" class="mb-1.5 block text-xs font-medium">{t.emailLabel}</label>
								<input
									id="email"
									type="email"
									bind:value={formData.email}
									required
									class="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm transition-all focus:ring-2 focus:ring-primary focus:outline-none"
									placeholder={t.emailPlaceholder}
								/>
							</div>

							<div>
								<label for="message" class="mb-1.5 block text-xs font-medium">{t.message}</label>
								<textarea
									id="message"
									bind:value={formData.message}
									required
									rows="4"
									class="w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm transition-all focus:ring-2 focus:ring-primary focus:outline-none"
									placeholder={t.messagePlaceholder}
								></textarea>
							</div>
						</div>

						<button
							type="submit"
							disabled={isSubmitting}
							class="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
						>
							{#if isSubmitting}
								<span class="animate-spin">⏳</span>
								{t.sending}
							{:else}
								<Send class="h-4 w-4" />
								{t.send}
							{/if}
						</button>
					{/if}
				</form>
			</div>
		</div>
	</div>
</section>
