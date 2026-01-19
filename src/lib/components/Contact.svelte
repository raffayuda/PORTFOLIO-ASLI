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
	let isSubmitting = $state(false);
	let submitStatus = $state<'idle' | 'success' | 'error'>('idle');
	let errorMessage = $state('');

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
		submitStatus = 'idle';
		errorMessage = '';

		try {
			// Using Web3Forms API
			const response = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					access_key: 'YOUR_WEB3FORMS_ACCESS_KEY', // User needs to get this from web3forms.com
					name: formData.name,
					email: formData.email,
					message: formData.message,
					to: 'raffayudapratama20@gmail.com',
					subject: `Portfolio Contact from ${formData.name}`
				})
			});

			const result = await response.json();

			if (result.success) {
				submitStatus = 'success';
				// Reset form
				formData = { name: '', email: '', message: '' };
				// Auto hide success message after 5 seconds
				setTimeout(() => {
					submitStatus = 'idle';
				}, 5000);
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
				<span class="bg-gradient-to-r from-white to-blue-600 bg-clip-text text-transparent"
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
			<form
				onsubmit={handleSubmit}
				class="space-y-5 rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all delay-200 duration-700"
				class:opacity-100={visible}
				class:translate-x-0={visible}
				class:opacity-0={!visible}
				class:translate-x-10={!visible}
			>
				<div>
					<label for="name" class="mb-1.5 block text-xs font-medium">{t.name}</label>
					<input
						type="text"
						id="name"
						bind:value={formData.name}
						required
						class="w-full rounded-lg border border-border bg-background px-4 py-3 transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
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
						class="w-full rounded-lg border border-border bg-background px-4 py-3 transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
						placeholder={t.emailPlaceholder}
					/>
				</div>

				<div>
					<label for="message" class="mb-1.5 block text-xs font-medium">{t.message}</label>
					<textarea
						id="message"
						rows="5"
						bind:value={formData.message}
						required
						class="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
						placeholder={t.messagePlaceholder}
					></textarea>
				</div>

				<button
					type="submit"
					disabled={isSubmitting}
					class="w-full rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isSubmitting ? t.sending : t.send}
				</button>

				<!-- Success Message -->
				{#if submitStatus === 'success'}
					<div
						class="rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-green-600 dark:text-green-400"
					>
						<p class="font-semibold">{t.successTitle}</p>
						<p class="mt-1 text-sm">{t.successMessage}</p>
					</div>
				{/if}

				<!-- Error Message -->
				{#if submitStatus === 'error'}
					<div
						class="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-600 dark:text-red-400"
					>
						<p class="font-semibold">Error</p>
						<p class="mt-1 text-sm">{errorMessage}</p>
					</div>
				{/if}
			</form>
		</div>
	</div>
</section>
