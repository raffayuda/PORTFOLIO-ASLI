<script lang="ts">
	interface Skill {
		name: string;
		devicon?: string;
		customSvg?: boolean;
	}

	let {
		skill,
		svgClass = 'skill-svg',
		deviconClass = 'skill-icon'
	}: {
		skill: Skill;
		svgClass?: string;
		deviconClass?: string;
	} = $props();
</script>

{#if skill.customSvg}
	{#if skill.name === 'Next.js'}
		<svg class={svgClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
			<path fill="currentColor" d="M18.974,31.5c0,0.828-0.671,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-14c0-0.653,0.423-1.231,1.045-1.43 c0.625-0.198,1.302,0.03,1.679,0.563l16.777,23.704C40.617,36.709,44,30.735,44,24c0-11-9-20-20-20S4,13,4,24s9,20,20,20 c3.192,0,6.206-0.777,8.89-2.122L18.974,22.216V31.5z M28.974,16.5c0-0.828,0.671-1.5,1.5-1.5s1.5,0.672,1.5,1.5v13.84l-3-4.227 V16.5z"></path>
		</svg>
	{:else if skill.name === 'Vercel'}
		<svg class={svgClass} viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
		</svg>
	{:else if skill.name === 'Prisma'}
		<svg class={svgClass} viewBox="0 0 256 310" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
			<path d="M254.313 235.519L148 9.749A17.063 17.063 0 0 0 133.473.037a16.87 16.87 0 0 0-15.533 8.052L2.633 194.848a17.465 17.465 0 0 0 .193 18.747L59.2 300.896a18.13 18.13 0 0 0 20.363 7.489l163.599-48.392a17.929 17.929 0 0 0 11.26-9.722 17.542 17.542 0 0 0-.101-14.76l-.008.008zm-23.802 9.683l-138.823 41.05a4.235 4.235 0 0 1-5.113-2.162l-47.534-75.633a4.28 4.28 0 0 1 .373-4.716L124.99 48.845a4.201 4.201 0 0 1 4.02-1.718 4.23 4.23 0 0 1 3.324 2.606l97.429 182.017a4.366 4.366 0 0 1 .549 4.456z" fill="currentColor"/>
		</svg>
	{:else if skill.name === 'Affinity'}
		<svg class={svgClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
			<path d="M24 2.344v19.312A2.345 2.345 0 0 1 21.656 24H2.344A2.345 2.345 0 0 1 0 21.656V2.344A2.345 2.345 0 0 1 2.344 0h19.312A2.345 2.345 0 0 1 24 2.344ZM1.758 21.305c0 .517.42.937.938.937h8.226l-4.299-7.445 7.528-13.039h-3.482L1.758 17.192v4.113Zm11.418-6.866-2.712-4.698-1.761 3.051a1.098 1.098 0 0 0 .952 1.647h3.521Zm9.066 6.873v-6.075H7.799l4.044 7.005h9.462a.937.937 0 0 0 .937-.93Zm-.937-19.554h-6.232l-4.148 7.185 3.173 5.496h8.144V2.688a.937.937 0 0 0-.937-.93Z"/>
		</svg>
	{/if}
{:else if skill.devicon}
	<i class="{skill.devicon} {deviconClass}"></i>
{/if}

<style>
	.skill-icon {
		font-size: 1.25rem;
		color: var(--muted-foreground);
		transition: color 0.3s ease;
	}

	.skill-svg {
		width: 1.25rem;
		height: 1.25rem;
		color: var(--muted-foreground);
		transition: color 0.3s ease;
	}
</style>
