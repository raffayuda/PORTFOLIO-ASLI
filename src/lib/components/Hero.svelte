<script lang="ts">
	import { personalInfo } from '$lib/data/portfolio';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/translations';
	import { Download, Mail, ArrowDown } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let mounted = $state(false);

	const techStack = ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js'];

	// Reactive translations
	const t = $derived(translations[$language].hero);

	onMount(() => {
		mounted = true;
	});
</script>

<section
	id="home"
	class="flex min-h-screen items-center justify-center px-4 pt-24 pb-8 sm:px-6 lg:px-8"
>
	<div class="container mx-auto max-w-6xl">
		<div class="grid items-center gap-8 lg:grid-cols-2">
			<!-- Left Content -->
			<div
				class="space-y-6 transition-all duration-1000"
				class:opacity-100={mounted}
				class:translate-y-0={mounted}
				class:opacity-0={!mounted}
				class:translate-y-10={!mounted}
			>
				<!-- Availability Badge -->
				<div
					class="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 backdrop-blur-sm"
				>
					<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500"></span>
					<span class="text-xs font-medium">{t.badge}</span>
				</div>

				<!-- Heading -->
				<div class="space-y-3">
					<h1 class="text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
						{t.heading}
						<span class="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
							>{t.headingHighlight}</span
						>
					</h1>

					<p class="max-w-xl text-base text-muted-foreground">
						{t.description}
					</p>
				</div>

				<!-- CTA Buttons -->
				<div class="flex flex-wrap gap-3">
					<a
						href="#projects"
						class="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-lg"
					>
						{t.ctaPrimary}
						<ArrowDown class="h-4 w-4 rotate-[-90deg]" />
					</a>

					<a
						href="#contact"
						class="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-6 py-3 text-sm font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-muted"
					>
						<Mail class="h-4 w-4" />
						{t.ctaSecondary}
					</a>
				</div>

				<!-- Tech Stack -->
				<div class="space-y-2 pt-4">
					<p class="text-xs text-muted-foreground">{t.techStack}</p>
					<div class="flex flex-wrap gap-2">
						{#each techStack as tech}
							<span
								class="rounded-lg border border-border bg-card/80 px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-colors hover:border-primary/50"
							>
								{tech}
							</span>
						{/each}
					</div>
				</div>
			</div>

			<!-- Right Side - Code Editor Mockup -->
			<div
				class="transition-all delay-300 duration-1000"
				class:opacity-100={mounted}
				class:translate-x-0={mounted}
				class:opacity-0={!mounted}
				class:translate-x-10={!mounted}
			>
				<div class="code-editor overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
					<!-- Window Controls -->
					<div class="flex items-center gap-1.5 border-b border-border bg-muted/50 px-3 py-2">
						<div class="h-2.5 w-2.5 rounded-full bg-red-500"></div>
						<div class="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
						<div class="h-2.5 w-2.5 rounded-full bg-green-500"></div>
					</div>

					<!-- Photo Content -->
					<div class="p-4">
						<div class="group relative">
							<!-- Photo Container -->
							<div class="aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted/20">
								<!-- Photo dengan efek grayscale -->
								<div
									class="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-600/10 to-blue-600/10"
								>
									<div class="h-full w-full">
										<img
											src="images/boday-ganteng.png"
											alt="Raffa Yuda Pratama"
											class="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
										/>
									</div>
								</div>
							</div>

							<!-- Overlay efek saat hover -->
							<div
								class="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
							>
								<div class="absolute right-0 bottom-0 left-0 p-4 text-white">
									<p class="text-sm font-semibold">Raffa Yuda Pratama</p>
									<p class="text-xs text-white/80">Fullstack Developer</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.code-editor {
		position: relative;
	}

	.code-editor::before {
		content: '';
		position: absolute;
		inset: -2px;
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3));
		border-radius: 1rem;
		opacity: 0;
		transition: opacity 0.3s;
		z-index: -1;
	}

	.code-editor:hover::before {
		opacity: 1;
	}

	pre {
		margin: 0;
		line-height: 1.6;
	}

	code {
		display: block;
	}
</style>
