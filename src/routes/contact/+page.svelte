<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/translations';
	import { Clock, CheckCircle, Zap } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let visible = $state(false);

	const t = $derived(translations[$language].contact);

	const faq = $derived([
		{
			q: $language === 'id' ? 'Berapa lama waktu pengerjaan proyek?' : 'How long does a project take?',
			a: $language === 'id' ? 'Tergantung kompleksitas, biasanya 1-4 minggu untuk proyek web standar.' : 'Depends on complexity, typically 1-4 weeks for standard web projects.'
		},
		{
			q: $language === 'id' ? 'Teknologi apa yang Anda gunakan?' : 'What technologies do you use?',
			a: $language === 'id' ? 'Next.js, SvelteKit, Laravel, Vue.js, dan berbagai stack modern lainnya.' : 'Next.js, SvelteKit, Laravel, Vue.js, and various other modern stacks.'
		},
		{
			q: $language === 'id' ? 'Apakah tersedia untuk proyek freelance?' : 'Are you available for freelance?',
			a: $language === 'id' ? 'Ya! Saya selalu terbuka untuk proyek baru yang menarik dan menantang.' : 'Yes! I\'m always open to new interesting and challenging projects.'
		}
	]);

	const highlights = $derived([
		{ icon: Clock, text: $language === 'id' ? 'Respon < 24 jam' : 'Response < 24 hours' },
		{ icon: CheckCircle, text: $language === 'id' ? 'Revisi tanpa batas' : 'Unlimited revisions' },
		{ icon: Zap, text: $language === 'id' ? 'Pengerjaan cepat' : 'Fast delivery' }
	]);

	onMount(() => { visible = true; });
</script>

<Seo
	title="Kontak - Raffa Yuda Pratama"
	description="Hubungi Raffa Yuda Pratama untuk kolaborasi proyek, konsultasi, atau peluang kerja sama. Email: raffayudapratama20@gmail.com."
	path="/contact"
/>

<div class="min-h-screen page-enter">
	<Navbar />

	<main class="pt-24 pb-20">
		<div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			<!-- Header -->
			<div
				class="mb-10 transition-all duration-700"
				class:opacity-100={visible}
				class:translate-y-0={visible}
				class:opacity-0={!visible}
				class:translate-y-8={!visible}
			>
				<h1 class="mb-3 text-4xl font-bold md:text-5xl">
					{t.title.split(' ')[0]}
					<span class="gradient-text">{t.title.split(' ').slice(1).join(' ')}</span>
				</h1>
				<p class="mb-6 max-w-lg text-sm text-muted-foreground">{t.subtitle}</p>

				<!-- Highlights -->
				<div class="flex flex-wrap gap-3">
					{#each highlights as h, i}
						<div class="glass flex items-center gap-2 rounded-xl px-4 py-2.5 transition-all duration-300 hover:-translate-y-0.5">
							<h.icon class="h-4 w-4 text-primary" />
							<span class="text-xs font-medium">{h.text}</span>
						</div>
					{/each}
				</div>
			</div>

			<!-- Contact Component -->
			<Contact />

			<!-- FAQ Section -->
			<div class="mt-16">
				<h2
					class="mb-6 text-xl font-bold transition-all delay-300 duration-700"
					class:opacity-100={visible}
					class:opacity-0={!visible}
				>
					FAQ
				</h2>
				<div class="grid gap-4 sm:grid-cols-3">
					{#each faq as item, i}
						<div
							class="glass group rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1"
							style="transition-delay: {(i + 4) * 80}ms"
							class:opacity-100={visible}
							class:opacity-0={!visible}
						>
							<h3 class="mb-2 text-sm font-bold group-hover:text-primary transition-colors">{item.q}</h3>
							<p class="text-xs leading-relaxed text-muted-foreground">{item.a}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</main>

	<Footer />
</div>
