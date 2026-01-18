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

					<!-- Code Content -->
					<div class="overflow-x-auto p-4 font-mono text-xs">
						<pre class="text-foreground"><code
								><span class="text-purple-600">import</span> <span class="text-foreground"
									>&#123;</span
								> <span class="text-blue-600">Designer</span><span class="text-foreground">,</span
								> <span class="text-blue-600">Developer</span> <span class="text-foreground"
									>&#125;</span
								> <span class="text-purple-600">from</span> <span class="text-green-600"
									>'@me/core'</span
								><span class="text-foreground">;</span>

<span class="text-purple-600">const</span> <span class="text-blue-600">Portfolio</span> <span
									class="text-foreground">=</span
								> <span class="text-foreground">()</span> <span class="text-purple-600">=&gt;</span
								> <span class="text-foreground">&#123;</span>
  <span class="text-purple-600">return</span> <span class="text-foreground">(</span>
    <span class="text-foreground">&lt;</span><span class="text-green-600">Section</span> <span
									class="text-blue-600">variant</span
								><span class="text-foreground">=</span><span class="text-orange-600">"clean"</span
								><span class="text-foreground">&gt;</span>
      <span class="text-foreground">&lt;</span><span class="text-green-600">Creativity</span> <span
									class="text-blue-600">level</span
								><span class="text-foreground">=</span><span class="text-orange-600">"high"</span
								> <span class="text-foreground">/&gt;</span>
      <span class="text-foreground">&lt;</span><span class="text-green-600">Code</span> <span
									class="text-blue-600">quality</span
								><span class="text-foreground">=</span><span class="text-orange-600">"clean"</span
								> <span class="text-foreground">/&gt;</span>
      <span class="text-foreground">&lt;</span><span class="text-green-600">createAwesomeUI</span
								><span class="text-foreground">()</span> <span class="text-foreground">/&gt;</span>
    <span class="text-foreground">&lt;/</span><span class="text-green-600">Section</span><span
									class="text-foreground">&gt;</span
								>
  <span class="text-foreground">)</span><span class="text-foreground">;</span>
<span class="text-foreground">&#125;;</span>

<span class="text-purple-600">export default</span> <span class="text-blue-600">Portfolio</span
								><span class="text-foreground">;</span></code
							></pre>
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
