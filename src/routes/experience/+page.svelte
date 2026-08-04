<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { experience } from '$lib/data/portfolio';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/translations';
	import { Briefcase, GraduationCap, MapPin, Calendar } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let visible = $state(false);
	const t = $derived(translations[$language].experience);

	const workExp = $derived(experience.filter(e => e.type === 'work'));
	const eduExp = $derived(experience.filter(e => e.type === 'education'));

	onMount(() => { visible = true; });
</script>

<Seo
	title="Pengalaman & Pendidikan - Raffa Yuda Pratama"
	description="Pengalaman kerja dan pendidikan Raffa Yuda Pratama: IT Team Intern di PT. IHATEC, Web Developer Intern, Teknik Informatika di STT Terpadu Nurul Fikri, dan RPL di SMK INFOKOM Bogor."
	path="/experience"
/>

<div class="min-h-screen page-enter">
	<Navbar />

	<main class="pt-24 pb-20">
		<div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			<!-- Header -->
			<div
				class="mb-14 transition-all duration-700"
				class:opacity-100={visible}
				class:translate-y-0={visible}
				class:opacity-0={!visible}
				class:translate-y-8={!visible}
			>
				<h1 class="mb-3 text-4xl font-bold md:text-5xl">
					{t.title.split(' & ')[0]} &<br />
					<span class="gradient-text">{t.title.split(' & ')[1]}</span>
				</h1>
				<p class="max-w-lg text-sm text-muted-foreground">{t.subtitle}</p>
			</div>

			<div class="grid gap-12 lg:grid-cols-2">
				<!-- Work Experience -->
				<div>
					<div class="mb-6 flex items-center gap-2.5">
						<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
							<Briefcase class="h-4 w-4 text-primary" />
						</div>
						<h2 class="text-lg font-bold">{$language === 'id' ? 'Pengalaman Kerja' : 'Work Experience'}</h2>
					</div>

					<div class="relative space-y-0">
						<div class="absolute top-2 bottom-2 left-4 w-px bg-gradient-to-b from-primary/30 via-primary/20 to-transparent"></div>
						{#each workExp as item, i}
							<div
								class="relative pl-10 transition-all duration-500"
								style="transition-delay: {i * 100}ms"
								class:opacity-100={visible}
								class:opacity-0={!visible}
							>
								<div class="absolute left-2.5 top-3 h-3 w-3 rounded-full border-2 border-background bg-primary shadow-md"
									style="box-shadow: 0 0 8px oklch(0.685 0.169 222 / 0.4);"
								></div>
								<div class="glass group rounded-2xl p-5 mb-4 transition-all hover:-translate-y-0.5">
									<div class="mb-1 flex items-center gap-2 text-[10px] text-primary font-semibold">
										<Calendar class="h-3 w-3" />
										{typeof item.period === 'object' ? item.period[$language] : item.period}
									</div>
									<h3 class="mb-1 text-sm font-bold group-hover:text-primary transition-colors">
										{typeof item.title === 'object' ? item.title[$language] : item.title}
									</h3>
									<div class="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
										<span class="font-medium">{item.company}</span>
										<span>•</span>
										<MapPin class="h-3 w-3" />
										<span>{item.location}</span>
									</div>
									<p class="text-xs leading-relaxed text-foreground/75">
										{typeof item.description === 'object' ? item.description[$language] : item.description}
									</p>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Education -->
				<div>
					<div class="mb-6 flex items-center gap-2.5">
						<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
							<GraduationCap class="h-4 w-4 text-primary" />
						</div>
						<h2 class="text-lg font-bold">{$language === 'id' ? 'Pendidikan' : 'Education'}</h2>
					</div>

					<div class="relative space-y-0">
						<div class="absolute top-2 bottom-2 left-4 w-px bg-gradient-to-b from-primary/30 via-primary/20 to-transparent"></div>
						{#each eduExp as item, i}
							<div
								class="relative pl-10 transition-all duration-500"
								style="transition-delay: {(i + 2) * 100}ms"
								class:opacity-100={visible}
								class:opacity-0={!visible}
							>
								<div class="absolute left-2.5 top-3 h-3 w-3 rounded-full border-2 border-background bg-primary shadow-md"
									style="box-shadow: 0 0 8px oklch(0.685 0.169 222 / 0.4);"
								></div>
								<div class="glass group rounded-2xl p-5 mb-4 transition-all hover:-translate-y-0.5">
									<div class="mb-1 flex items-center gap-2 text-[10px] text-primary font-semibold">
										<Calendar class="h-3 w-3" />
										{typeof item.period === 'object' ? item.period[$language] : item.period}
									</div>
									<h3 class="mb-1 text-sm font-bold group-hover:text-primary transition-colors">
										{typeof item.title === 'object' ? item.title[$language] : item.title}
									</h3>
									<div class="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
										<span class="font-medium">{item.company}</span>
										<span>•</span>
										<MapPin class="h-3 w-3" />
										<span>{item.location}</span>
									</div>
									<p class="text-xs leading-relaxed text-foreground/75">
										{typeof item.description === 'object' ? item.description[$language] : item.description}
									</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</main>

	<Footer />
</div>
