<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { skills } from '$lib/data/portfolio';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/translations';
	import { onMount } from 'svelte';
	import SkillIcon from '$lib/components/SkillIcon.svelte';

	let visible = $state(false);
	const t = $derived(translations[$language].skills);

	// Categorize skills
	const categories = $derived([
		{
			title: $language === 'id' ? 'Frontend' : 'Frontend',
			items: skills.filter(s => ['React', 'Next.js', 'Svelte', 'SvelteKit', 'Vue.js', 'HTML', 'CSS', 'Tailwind CSS', 'JavaScript', 'TypeScript'].includes(s.name))
		},
		{
			title: $language === 'id' ? 'Backend' : 'Backend',
			items: skills.filter(s => ['Node.js', 'Python', 'PHP', 'Laravel'].includes(s.name))
		},
		{
			title: $language === 'id' ? 'Database' : 'Database',
			items: skills.filter(s => ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma', 'Firebase'].includes(s.name))
		},
		{
			title: $language === 'id' ? 'DevOps & Tools' : 'DevOps & Tools',
			items: skills.filter(s => ['Git', 'GitHub', 'Docker', 'Figma', 'Affinity', 'Vercel'].includes(s.name))
		}
	]);

	// Marquee rows
	const row1 = skills.slice(0, Math.ceil(skills.length / 2));
	const row2 = skills.slice(Math.ceil(skills.length / 2));

	onMount(() => { visible = true; });
</script>

<Seo
	title="Keahlian & Teknologi - Raffa Yuda Pratama"
	description="Keahlian dan teknologi yang dikuasai Raffa Yuda Pratama: React, Next.js, SvelteKit, TypeScript, Node.js, Python, Laravel, PostgreSQL, dan DevOps."
	path="/skills"
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
					{t.title} <span class="gradient-text">& {$language === 'id' ? 'Teknologi' : 'Technologies'}</span>
				</h1>
				<p class="max-w-lg text-sm text-muted-foreground">{t.subtitle}</p>
			</div>

			<!-- Marquee showcase -->
			<div class="mb-16 space-y-3">
				<div class="marquee-container">
					<div class="marquee-track">
						{#each [...row1, ...row1] as skill}
							<div class="glass-subtle flex items-center gap-2.5 rounded-xl px-4 py-2.5 flex-shrink-0">
								<SkillIcon {skill} svgClass="h-5 w-5 text-muted-foreground" deviconClass="text-xl text-muted-foreground" />
								<span class="text-xs font-semibold whitespace-nowrap">{skill.name}</span>
							</div>
						{/each}
					</div>
				</div>
				<div class="marquee-container">
					<div class="marquee-track reverse">
						{#each [...row2, ...row2] as skill}
							<div class="glass-subtle flex items-center gap-2.5 rounded-xl px-4 py-2.5 flex-shrink-0">
								<SkillIcon {skill} svgClass="h-5 w-5 text-muted-foreground" deviconClass="text-xl text-muted-foreground" />
								<span class="text-xs font-semibold whitespace-nowrap">{skill.name}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- Categories breakdown -->
			<h2
				class="mb-6 text-xl font-bold transition-all delay-200 duration-700"
				class:opacity-100={visible}
				class:opacity-0={!visible}
			>
				{$language === 'id' ? 'Berdasarkan Kategori' : 'By Category'}
			</h2>

			<div class="grid gap-5 sm:grid-cols-2">
				{#each categories as cat, i}
					<div
						class="glass group rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1"
						style="transition-delay: {(i + 3) * 80}ms"
						class:opacity-100={visible}
						class:opacity-0={!visible}
					>
						<div class="mb-4 flex items-center justify-between">
							<h3 class="text-sm font-bold">{cat.title}</h3>
							<span class="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
								{cat.items.length} {$language === 'id' ? 'skill' : 'skills'}
							</span>
						</div>
						<div class="flex flex-wrap gap-2">
							{#each cat.items as skill}
								<div class="flex items-center gap-1.5 rounded-lg bg-accent/50 px-2.5 py-1.5 transition-all hover:bg-primary/10 hover:text-primary">
									<SkillIcon {skill} svgClass="h-4 w-4" deviconClass="text-sm" />
									<span class="text-[11px] font-medium">{skill.name}</span>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>

			<!-- Learning Journey -->
			<div class="mt-16">
				<h2
					class="mb-6 text-xl font-bold transition-all delay-300 duration-700"
					class:opacity-100={visible}
					class:opacity-0={!visible}
				>
					{$language === 'id' ? 'Perjalanan Belajar' : 'Learning Journey'}
				</h2>
				<div
					class="glass rounded-2xl p-6 transition-all delay-400 duration-700"
					class:opacity-100={visible}
					class:opacity-0={!visible}
				>
					<div class="grid gap-6 sm:grid-cols-3">
						<div class="text-center">
							<p class="text-3xl font-bold gradient-text">2021</p>
							<p class="mt-1 text-xs text-muted-foreground">{$language === 'id' ? 'Mulai belajar coding' : 'Started coding'}</p>
							<p class="mt-2 text-[11px] text-foreground/70">HTML, CSS, JavaScript, PHP</p>
						</div>
						<div class="text-center">
							<p class="text-3xl font-bold gradient-text">2023</p>
							<p class="mt-1 text-xs text-muted-foreground">{$language === 'id' ? 'Framework modern' : 'Modern frameworks'}</p>
							<p class="mt-2 text-[11px] text-foreground/70">React, Laravel, Vue, Next.js</p>
						</div>
						<div class="text-center">
							<p class="text-3xl font-bold gradient-text">2025</p>
							<p class="mt-1 text-xs text-muted-foreground">{$language === 'id' ? 'Full-stack & AI/ML' : 'Full-stack & AI/ML'}</p>
							<p class="mt-2 text-[11px] text-foreground/70">SvelteKit, Python, Docker, Prisma</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>

	<Footer />
</div>

<style>
	.marquee-container {
		overflow: hidden;
		mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
	}
	.marquee-track { display: flex; gap: 0.75rem; width: max-content; animation: marquee 30s linear infinite; }
	.marquee-track.reverse { animation: marquee-reverse 30s linear infinite; }
	.marquee-container:hover .marquee-track { animation-play-state: paused; }
</style>
