<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { personalInfo, bio, skills as allSkills, experience, services } from '$lib/data/portfolio';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/translations';
	import { User, MapPin, Code2, FolderGit2, Briefcase, GraduationCap, Heart, Coffee, Gamepad2, Music, Calendar, ArrowRight } from '@lucide/svelte';
	import * as LucideIcons from '@lucide/svelte';
	import { onMount } from 'svelte';

	let visible = $state(false);
	let projectCount = $state(0);
	const t = $derived(translations[$language].about);
	const tExp = $derived(translations[$language].experience);
	const tSvc = $derived(translations[$language].services);

	const stats = $derived([
		{ icon: FolderGit2, value: (projectCount ? projectCount : 0) + '+', label: $language === 'id' ? 'Proyek' : 'Projects' },
		{ icon: Code2, value: '3+', label: $language === 'id' ? 'Tahun Coding' : 'Years Coding' },
		{ icon: User, value: allSkills.length + '+', label: $language === 'id' ? 'Teknologi' : 'Technologies' },
		{ icon: Briefcase, value: experience.filter(e => e.type === 'work').length, label: $language === 'id' ? 'Pengalaman Kerja' : 'Work Experience' }
	]);

	const interests = $derived([
		{ icon: Coffee, label: $language === 'id' ? 'Pecinta Kopi' : 'Coffee Lover' },
		{ icon: Gamepad2, label: $language === 'id' ? 'Gaming' : 'Gaming' },
		{ icon: Music, label: $language === 'id' ? 'Musik' : 'Music' },
		{ icon: Heart, label: $language === 'id' ? 'Open Source' : 'Open Source' }
	]);

	const whatIDo = $derived([
		{
			title: $language === 'id' ? 'Frontend Development' : 'Frontend Development',
			desc: $language === 'id' ? 'Membangun antarmuka yang responsif dan interaktif dengan React, Next.js, Svelte, dan Vue.' : 'Building responsive and interactive interfaces with React, Next.js, Svelte, and Vue.'
		},
		{
			title: $language === 'id' ? 'Backend Development' : 'Backend Development',
			desc: $language === 'id' ? 'Membuat server-side logic, API, dan manajemen database yang efisien dan scalable.' : 'Creating efficient and scalable server-side logic, APIs, and database management.'
		},
		{
			title: $language === 'id' ? 'Data & AI/ML' : 'Data & AI/ML',
			desc: $language === 'id' ? 'Menganalisis data dan membangun model machine learning untuk solusi cerdas.' : 'Analyzing data and building machine learning models for intelligent solutions.'
		}
	]);

	const workExp = $derived(experience.filter(e => e.type === 'work'));
	const eduExp = $derived(experience.filter(e => e.type === 'education'));

		visible = true;
		fetch('/api/projects')
			.then((res) => res.json())
			.then((data) => {
				projectCount = Array.isArray(data.projects) ? data.projects.length : 0;
			})
			.catch(() => {});
	
	onMount(() => { visible = true; });
</script>

<svelte:head>
	<title>About - Raffa Yuda Pratama</title>
	<meta name="description" content="Learn more about Raffa Yuda Pratama, a Full Stack Developer from Bogor, Indonesia." />
</svelte:head>

<div class="min-h-screen page-enter">
	<Navbar />

	<main class="pt-24 pb-20">
		<div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			<!-- Hero Header -->
			<div
				class="mb-14 transition-all duration-700"
				class:opacity-100={visible}
				class:translate-y-0={visible}
				class:opacity-0={!visible}
				class:translate-y-8={!visible}
			>
				<h1 class="mb-3 text-4xl font-bold md:text-5xl">
					{t.title.split(' ')[0]}
					<span class="gradient-text">{t.title.split(' ').slice(1).join(' ')}</span>
				</h1>
				<p class="max-w-lg text-sm text-muted-foreground">{t.subtitle}</p>
			</div>

			<!-- Main content: Photo + Bio + Stats -->
			<div class="mb-16 grid gap-5 md:grid-cols-3">
				<!-- Photo -->
				<div
					class="glass group overflow-hidden rounded-2xl transition-all delay-100 duration-700"
					class:opacity-100={visible}
					class:opacity-0={!visible}
				>
					<div class="relative aspect-[3/4]">
						<img src="/images/boday-ganteng.png" alt={personalInfo.name}
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
						<div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
						<div class="absolute bottom-0 left-0 right-0 p-5">
							<p class="text-lg font-bold text-white">{personalInfo.name}</p>
							<div class="flex items-center gap-1.5 text-xs text-white/70">
								<MapPin class="h-3 w-3" />
								{personalInfo.location}
							</div>
						</div>
					</div>
				</div>

				<!-- Bio + Stats -->
				<div class="space-y-5 md:col-span-2">
					<div
						class="glass rounded-2xl p-6 transition-all delay-200 duration-700 md:p-8"
						class:opacity-100={visible}
						class:opacity-0={!visible}
					>
						<h2 class="mb-4 text-lg font-bold">{personalInfo.title}</h2>
						<p class="mb-3 text-sm leading-relaxed text-foreground/85">{bio[$language].intro}</p>
						<p class="text-sm leading-relaxed text-foreground/85">{bio[$language].detail}</p>
					</div>

					<!-- Stats grid -->
					<div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
						{#each stats as stat, i}
							<div
								class="glass rounded-2xl p-4 text-center transition-all duration-500 hover:-translate-y-1"
								style="transition-delay: {(i + 3) * 80}ms"
								class:opacity-100={visible}
								class:opacity-0={!visible}
							>
								<p class="text-2xl font-bold">{stat.value}</p>
								<p class="text-[10px] text-muted-foreground">{stat.label}</p>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- What I Do -->
			<div class="mb-16">
				<h2
					class="mb-6 text-xl font-bold transition-all delay-300 duration-700"
					class:opacity-100={visible}
					class:opacity-0={!visible}
				>
					{$language === 'id' ? 'Apa yang Saya Lakukan' : 'What I Do'}
				</h2>
				<div class="grid gap-4 sm:grid-cols-3">
					{#each whatIDo as item, i}
						<div
							class="glass group rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1"
							style="transition-delay: {(i + 4) * 80}ms"
							class:opacity-100={visible}
							class:opacity-0={!visible}
						>
							<div class="mb-3 h-1 w-8 rounded-full bg-primary/50 transition-all group-hover:w-12 group-hover:bg-primary"></div>
							<h3 class="mb-2 text-sm font-bold">{item.title}</h3>
							<p class="text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
						</div>
					{/each}
				</div>
			</div>

			<!-- ═══════════════════════════════════════════ -->
			<!-- Services Section -->
			<!-- ═══════════════════════════════════════════ -->
			<div class="mb-16">
				<div
					class="mb-8 transition-all delay-300 duration-700"
					class:opacity-100={visible}
					class:opacity-0={!visible}
				>
					<h2 class="mb-2 text-xl font-bold">
						{tSvc.title.split(' ')[0]}
						<span class="gradient-text">{tSvc.title.split(' ').slice(1).join(' ')}</span>
					</h2>
					<p class="text-sm text-muted-foreground">{tSvc.subtitle}</p>
				</div>

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
			</div>

			<!-- ═══════════════════════════════════════════ -->
			<!-- Experience & Education Section -->
			<!-- ═══════════════════════════════════════════ -->
			<div class="mb-16">
				<div
					class="mb-8 transition-all delay-300 duration-700"
					class:opacity-100={visible}
					class:opacity-0={!visible}
				>
					<h2 class="mb-2 text-xl font-bold">
						{tExp.title.split(' & ')[0]} &
						<span class="gradient-text">{tExp.title.split(' & ')[1]}</span>
					</h2>
					<p class="text-sm text-muted-foreground">{tExp.subtitle}</p>
				</div>

				<div class="grid gap-12 lg:grid-cols-2">
					<!-- Work Experience -->
					<div>
						<div class="mb-6 flex items-center gap-2.5">
							<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
								<Briefcase class="h-4 w-4 text-primary" />
							</div>
							<h3 class="text-lg font-bold">{$language === 'id' ? 'Pengalaman Kerja' : 'Work Experience'}</h3>
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
										<h4 class="mb-1 text-sm font-bold group-hover:text-primary transition-colors">
											{typeof item.title === 'object' ? item.title[$language] : item.title}
										</h4>
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
							<h3 class="text-lg font-bold">{$language === 'id' ? 'Pendidikan' : 'Education'}</h3>
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
										<h4 class="mb-1 text-sm font-bold group-hover:text-primary transition-colors">
											{typeof item.title === 'object' ? item.title[$language] : item.title}
										</h4>
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

			<!-- Interests -->
			<div>
				<h2
					class="mb-6 text-xl font-bold transition-all delay-400 duration-700"
					class:opacity-100={visible}
					class:opacity-0={!visible}
				>
					{$language === 'id' ? 'Di Luar Coding' : 'Outside of Coding'}
				</h2>
				<div class="flex flex-wrap gap-3">
					{#each interests as interest, i}
						<div
							class="glass flex items-center gap-2.5 rounded-xl px-4 py-3 transition-all duration-300 hover:-translate-y-0.5"
							style="transition-delay: {(i + 6) * 60}ms"
							class:opacity-100={visible}
							class:opacity-0={!visible}
						>
							<interest.icon class="h-4 w-4 text-primary" />
							<span class="text-xs font-medium">{interest.label}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</main>

	<Footer />
</div>
