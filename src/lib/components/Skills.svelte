<script lang="ts">
	import { skills } from '$lib/data/portfolio';
	import { onMount } from 'svelte';

	let visible = $state(false);

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

		const section = document.querySelector('#skills');
		if (section) observer.observe(section);

		return () => observer.disconnect();
	});
</script>

<section id="skills" class="bg-muted/30 py-12 md:py-20">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div
			class="mb-10 text-center transition-all duration-700"
			class:opacity-100={visible}
			class:translate-y-0={visible}
			class:opacity-0={!visible}
			class:translate-y-10={!visible}
		>
			<h2 class="mb-2 text-2xl font-bold md:text-3xl">
				Keahlian <span
					class="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
					>Saya</span
				>
			</h2>
		</div>

		<!-- Skills Grid -->
		<div
			class="mx-auto max-w-5xl transition-all delay-200 duration-700"
			class:opacity-100={visible}
			class:translate-y-0={visible}
			class:opacity-0={!visible}
			class:translate-y-10={!visible}
		>
			<div class="flex flex-wrap justify-center gap-4">
				{#each skills as skill, i}
					<div class="skill-card group" style="transition-delay: {i * 30}ms">
						<div class="flex items-center gap-3">
							{#if skill.customSvg}
								<!-- Custom SVG Icons -->
								{#if skill.name === 'Next.js'}
									<svg
										class="skill-icon-svg"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 48 48"
									>
										<path
											fill="currentColor"
											d="M18.974,31.5c0,0.828-0.671,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-14c0-0.653,0.423-1.231,1.045-1.43 c0.625-0.198,1.302,0.03,1.679,0.563l16.777,23.704C40.617,36.709,44,30.735,44,24c0-11-9-20-20-20S4,13,4,24s9,20,20,20 c3.192,0,6.206-0.777,8.89-2.122L18.974,22.216V31.5z M28.974,16.5c0-0.828,0.671-1.5,1.5-1.5s1.5,0.672,1.5,1.5v13.84l-3-4.227 V16.5z"
										></path>
									</svg>
								{:else if skill.name === 'Vercel'}
									<svg
										class="skill-icon-svg"
										viewBox="0 0 76 65"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
									</svg>
								{:else if skill.name === 'Prisma'}
									<svg
										class="skill-icon-svg"
										viewBox="0 0 256 310"
										xmlns="http://www.w3.org/2000/svg"
										preserveAspectRatio="xMidYMid"
									>
										<path
											d="M254.313 235.519L148 9.749A17.063 17.063 0 0 0 133.473.037a16.87 16.87 0 0 0-15.533 8.052L2.633 194.848a17.465 17.465 0 0 0 .193 18.747L59.2 300.896a18.13 18.13 0 0 0 20.363 7.489l163.599-48.392a17.929 17.929 0 0 0 11.26-9.722 17.542 17.542 0 0 0-.101-14.76l-.008.008zm-23.802 9.683l-138.823 41.05a4.235 4.235 0 0 1-5.113-2.162l-47.534-75.633a4.28 4.28 0 0 1 .373-4.716L124.99 48.845a4.201 4.201 0 0 1 4.02-1.718 4.23 4.23 0 0 1 3.324 2.606l97.429 182.017a4.366 4.366 0 0 1 .549 4.456z"
											fill="currentColor"
										/>
									</svg>
								{/if}
							{:else if skill.devicon}
								<i class="{skill.devicon} skill-icon"></i>
							{:else if skill.textIcon}
								<span class="skill-text-icon">{skill.textIcon}</span>
							{:else}
								<span class="text-2xl text-muted-foreground">💻</span>
							{/if}
							<span class="text-sm font-semibold whitespace-nowrap">{skill.name}</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.skill-card {
		position: relative;
		padding: 0.875rem 1.25rem;
		background: rgba(255, 255, 255, 0.5);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 1rem;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
	}

	.skill-card:hover {
		background: rgba(255, 255, 255, 0.7);
		border-color: rgba(139, 92, 246, 0.4);
		box-shadow:
			0 10px 30px -10px rgba(139, 92, 246, 0.25),
			0 0 20px rgba(139, 92, 246, 0.15);
		transform: translateY(-2px) scale(1.02);
	}

	.skill-icon {
		font-size: 2rem;
		color: rgb(var(--color-muted-foreground-rgb, 115 115 115));
		transition: all 0.3s ease;
	}

	.skill-card:hover .skill-icon {
		color: rgb(139, 92, 246);
		transform: scale(1.1);
	}

	.skill-icon-svg {
		width: 1.75rem;
		height: 1.75rem;
		color: rgb(var(--color-muted-foreground-rgb, 115 115 115));
		transition: all 0.3s ease;
	}

	.skill-card:hover .skill-icon-svg {
		color: rgb(139, 92, 246);
		transform: scale(1.1);
	}

	.skill-text-icon {
		font-size: 1.25rem;
		font-weight: 700;
		color: rgb(var(--color-muted-foreground-rgb, 115 115 115));
		transition: all 0.3s ease;
		font-family: 'Inter', sans-serif;
	}

	.skill-card:hover .skill-text-icon {
		color: rgb(139, 92, 246);
		transform: scale(1.1);
	}

	/* Dark mode support */
	:global(.dark) .skill-card {
		background: rgba(39, 39, 42, 0.5);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border-color: rgba(255, 255, 255, 0.08);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
	}

	:global(.dark) .skill-card:hover {
		background: rgba(39, 39, 42, 0.7);
		border-color: rgba(167, 139, 250, 0.4);
		box-shadow:
			0 10px 30px -10px rgba(167, 139, 250, 0.25),
			0 0 20px rgba(167, 139, 250, 0.15);
	}

	:global(.dark) .skill-icon {
		color: rgb(161, 161, 170);
	}

	:global(.dark) .skill-card:hover .skill-icon {
		color: rgb(167, 139, 250);
	}

	:global(.dark) .skill-icon-svg {
		color: rgb(161, 161, 170);
	}

	:global(.dark) .skill-card:hover .skill-icon-svg {
		color: rgb(167, 139, 250);
	}

	:global(.dark) .skill-text-icon {
		color: rgb(161, 161, 170);
	}

	:global(.dark) .skill-card:hover .skill-text-icon {
		color: rgb(167, 139, 250);
	}
</style>
