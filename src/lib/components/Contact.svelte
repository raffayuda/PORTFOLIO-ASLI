<script lang="ts">
	import { personalInfo, socialLinks } from '$lib/data/portfolio';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/translations';
	import { Mail, MapPin, Github, Linkedin, Twitter, Instagram, Send } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let visible = $state(false);
	let formData = $state({ name: '', email: '', message: '' });
	let isSubmitting = $state(false);
	let submitStatus = $state<'idle' | 'success' | 'error'>('idle');
	let errorMessage = $state('');

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
					if (entry.isIntersecting) visible = true;
				});
			},
			{ threshold: 0.1 }
		);

		const section = document.querySelector('#contact');
		if (section) observer.observe(section);

		return () => observer.disconnect();
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		isSubmitting = true;
		submitStatus = 'idle';
		errorMessage = '';

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			});

			const result = await response.json();

			if (result.success) {
				submitStatus = 'success';
				formData = { name: '', email: '', message: '' };
				setTimeout(() => { submitStatus = 'idle'; }, 5000);
			} else {
				submitStatus = 'error';
				errorMessage = result.message || 'Failed to send message';
			}
		} catch (error) {
			submitStatus = 'error';
			errorMessage = 'Network error. Please try again.';
			console.error('Form submission error:', error);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<section id="contact" class="relative overflow-hidden py-16 md:py-24">
	<div class="pointer-events-none absolute inset-0">
		<div class="absolute top-0 right-0 h-[300px] w-[300px] rounded-full opacity-12 blur-[100px]"
			style="background: linear-gradient(135deg, #06b6d4, #0ea5e9);"
		></div>
	</div>

	<div class="relative z-10 container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
		<div
			class="mb-10 text-center transition-all duration-700"
			class:opacity-100={visible}
			class:translate-y-0={visible}
			class:opacity-0={!visible}
			class:translate-y-8={!visible}
		>
			<h2 class="mb-2 text-2xl font-bold md:text-3xl">
				{t.title.split(' ')[0]}
				<span class="gradient-text">{t.title.split(' ').slice(1).join(' ')}</span>
			</h2>
			<p class="text-sm text-muted-foreground">{t.subtitle}</p>
		</div>

		<div class="grid gap-5 md:grid-cols-2">
			<!-- Contact Info -->
			<div
				class="glass rounded-2xl p-6 transition-all delay-100 duration-700"
				class:opacity-100={visible}
				class:translate-y-0={visible}
				class:opacity-0={!visible}
				class:translate-y-8={!visible}
			>
				<h3 class="mb-5 text-lg font-bold">{t.contactInfo}</h3>

				<div class="space-y-4">
					<div class="group flex items-center gap-4">
						<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
							<Mail class="h-4 w-4 text-primary" />
						</div>
						<div>
							<p class="text-xs text-muted-foreground">{t.email}</p>
							<a href="mailto:{personalInfo.email}" class="text-sm font-medium transition-colors hover:text-primary">
								{personalInfo.email}
							</a>
						</div>
					</div>

					<div class="group flex items-center gap-4">
						<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
							<MapPin class="h-4 w-4 text-primary" />
						</div>
						<div>
							<p class="text-xs text-muted-foreground">{t.location}</p>
							<p class="text-sm font-medium">{personalInfo.location}</p>
						</div>
					</div>
				</div>

				<!-- Social Links -->
				<div class="mt-6 border-t border-border/50 pt-5">
					<p class="mb-3 text-xs text-muted-foreground">{t.followMe}</p>
					<div class="flex gap-2.5">
						{#each socials as social}
							{@const Icon = social.icon}
							<a
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								class="glass-subtle flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 hover:scale-110 hover:border-primary/40 hover:text-primary"
								aria-label={social.label}
							>
								<Icon class="h-4 w-4" />
							</a>
						{/each}
					</div>
				</div>
			</div>

			<!-- Contact Form -->
			<form
				onsubmit={handleSubmit}
				class="glass rounded-2xl p-6 transition-all delay-200 duration-700"
				class:opacity-100={visible}
				class:translate-y-0={visible}
				class:opacity-0={!visible}
				class:translate-y-8={!visible}
			>
				<div class="space-y-4">
					<div>
						<label for="name" class="mb-1.5 block text-xs font-medium">{t.name}</label>
						<input
							type="text"
							id="name"
							bind:value={formData.name}
							required
							class="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-2.5 text-sm backdrop-blur-sm transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
							placeholder={t.namePlaceholder}
						/>
					</div>

					<div>
						<label for="email" class="mb-1.5 block text-xs font-medium">{t.emailLabel}</label>
						<input
							type="email"
							id="email"
							bind:value={formData.email}
							required
							class="w-full rounded-xl border border-border/50 bg-background/50 px-4 py-2.5 text-sm backdrop-blur-sm transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
							placeholder={t.emailPlaceholder}
						/>
					</div>

					<div>
						<label for="message" class="mb-1.5 block text-xs font-medium">{t.message}</label>
						<textarea
							id="message"
							rows="4"
							bind:value={formData.message}
							required
							class="w-full resize-none rounded-xl border border-border/50 bg-background/50 px-4 py-2.5 text-sm backdrop-blur-sm transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
							placeholder={t.messagePlaceholder}
						></textarea>
					</div>

					<button
						type="submit"
						disabled={isSubmitting}
						class="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25 disabled:cursor-not-allowed disabled:opacity-50"
					>
						<Send class="h-4 w-4" />
						{isSubmitting ? t.sending : t.send}
					</button>
				</div>

				{#if submitStatus === 'success'}
					<div class="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-emerald-600 dark:text-emerald-400">
						<p class="text-sm font-semibold">{t.successTitle}</p>
						<p class="mt-0.5 text-xs">{t.successMessage}</p>
					</div>
				{/if}

				{#if submitStatus === 'error'}
					<div class="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-600 dark:text-red-400">
						<p class="text-sm font-semibold">Error</p>
						<p class="mt-0.5 text-xs">{errorMessage}</p>
					</div>
				{/if}
			</form>
		</div>
	</div>
</section>
