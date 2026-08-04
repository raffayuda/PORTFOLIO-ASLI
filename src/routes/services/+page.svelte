<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { services } from '$lib/data/portfolio';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/translations';
	import * as LucideIcons from '@lucide/svelte';
	import { ArrowRight } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let visible = $state(false);
	const t = $derived(translations[$language].services);

	onMount(() => {
		visible = true;
	});
</script>

<Seo
	title="Layanan - Raffa Yuda Pratama"
	description="Layanan profesional Raffa Yuda Pratama: pengembangan web, desain UI/UX, pengembangan mobile, API, desain database, dan konsultasi."
	path="/services"
/>

<div class="min-h-screen page-enter">
	<Navbar />

	<main class="pt-24 pb-16">
		<div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			<!-- Header -->
			<div
				class="mb-12 text-center transition-all duration-700"
				class:opacity-100={visible}
				class:translate-y-0={visible}
				class:opacity-0={!visible}
				class:translate-y-8={!visible}
			>
				<h1 class="mb-3 text-3xl font-bold md:text-4xl">
					{t.title.split(' ')[0]}
					<span class="gradient-text">{t.title.split(' ').slice(1).join(' ')}</span>
				</h1>
				<p class="mx-auto max-w-lg text-sm text-muted-foreground">{t.subtitle}</p>
			</div>

			<!-- Services Grid -->
			<div class="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{#each services as service, i}
					{@const Icon = LucideIcons[service.icon as keyof typeof LucideIcons]}
					<div
						class="glass group rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2"
						style="transition-delay: {i * 80}ms"
						class:opacity-100={visible}
						class:translate-y-0={visible}
						class:opacity-0={!visible}
						class:translate-y-8={!visible}
					>
						<div class="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
							{#if Icon}
								<Icon class="h-6 w-6 text-primary" />
							{/if}
						</div>
						<h3 class="mb-2 text-base font-bold transition-colors group-hover:text-primary">
							{service.title[$language]}
						</h3>
						<p class="text-sm leading-relaxed text-muted-foreground">
							{service.description[$language]}
						</p>
					</div>
				{/each}
			</div>

			<!-- CTA Section -->
			<div
				class="glass mx-auto mt-16 max-w-2xl rounded-2xl p-8 text-center transition-all delay-500 duration-700"
				class:opacity-100={visible}
				class:opacity-0={!visible}
			>
				<h2 class="mb-3 text-xl font-bold">{t.cta}</h2>
				<a
					href="/#contact"
					class="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
				>
					{t.ctaButton}
					<ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
				</a>
			</div>
		</div>
	</main>

	<Footer />
</div>
