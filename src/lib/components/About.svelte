<script lang="ts">
	import { personalInfo, bio, skills as allSkills } from '$lib/data/portfolio';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/translations';
	import { User, MapPin, Code2, FolderGit2 } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let visible = $state(false);
	let projectCount = $state(0);

	const t = $derived(translations[$language].about);

	const stats = $derived([
		{ icon: FolderGit2, value: (projectCount ? projectCount : 0) + '+', labelKey: 'projects' as const },
		{ icon: Code2, value: '3+', labelKey: 'experience' as const },
		{ icon: User, value: allSkills.length + '+', labelKey: 'technologies' as const }
	]);

	onMount(() => {
		// Fetch dynamic project count from DB
		fetch('/api/projects')
			.then((res) => res.json())
			.then((data) => {
				projectCount = Array.isArray(data.projects) ? data.projects.length : 0;
			})
			.catch(() => {});

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visible = true;
					}
				});
			},
			{ threshold: 0.15 }
		);

		const section = document.querySelector('#about');
		if (section) observer.observe(section);

		return () => observer.disconnect();
	});
</script>

<section id="about" class="relative overflow-hidden py-16 md:py-24">
	<!-- Background -->
	<div class="pointer-events-none absolute inset-0">
		<div
			class="absolute top-20 right-0 h-[350px] w-[350px] rounded-full opacity-15 blur-[100px]"
			style="background: linear-gradient(135deg, #0ea5e9, #06b6d4);"
		></div>
	</div>

	<div class="relative z-10 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
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

		<div class="grid gap-5 md:grid-cols-3">
			<!-- Bio Card (spans 2) -->
			<div
				class="glass rounded-2xl p-6 transition-all delay-100 duration-700 md:col-span-2 md:p-8"
				class:opacity-100={visible}
				class:translate-y-0={visible}
				class:opacity-0={!visible}
				class:translate-y-8={!visible}
			>
				<div class="mb-4 flex items-center gap-3">
					<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
						<User class="h-5 w-5 text-primary" />
					</div>
					<div>
						<h3 class="font-bold">{personalInfo.name}</h3>
						<p class="text-xs text-muted-foreground">{personalInfo.title}</p>
					</div>
				</div>

				<div class="space-y-3">
					<p class="text-sm leading-relaxed text-foreground/85">
						{bio[$language].intro}
					</p>
					<p class="text-sm leading-relaxed text-foreground/85">
						{bio[$language].detail}
					</p>
				</div>

				<div class="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
					<MapPin class="h-4 w-4" />
					<span>{personalInfo.location}</span>
				</div>
			</div>

			<!-- Stats Cards -->
			<div
				class="flex flex-col gap-4 transition-all delay-200 duration-700"
				class:opacity-100={visible}
				class:translate-y-0={visible}
				class:opacity-0={!visible}
				class:translate-y-8={!visible}
			>
				{#each stats as stat, i}
					{@const Icon = stat.icon}
					<div
						class="glass flex-1 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
						style="transition-delay: {(i + 2) * 100}ms"
					>
						<div class="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
							<Icon class="h-4 w-4 text-primary" />
						</div>
						<p class="text-2xl font-bold">{stat.value}</p>
						<p class="text-xs text-muted-foreground">{t.stats[stat.labelKey]}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
