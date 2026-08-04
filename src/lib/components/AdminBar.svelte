<script lang="ts">
	import { admin } from '$lib/stores/admin';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { LogOut, Plus, Settings2, ShieldCheck } from '@lucide/svelte';

	let ready = $state(false);

	onMount(async () => {
		await admin.check();
		ready = true;
	});

	async function handleLogout() {
		await admin.logout();
		goto('/');
	}
</script>

{#if ready && $admin.authenticated}
	<div
		class="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-2xl border border-border/40 bg-background/80 p-2 shadow-2xl backdrop-blur-xl"
	>
		<span class="ml-2 flex items-center gap-1.5 text-xs font-semibold text-primary">
			<ShieldCheck class="h-4 w-4" />
			Admin
		</span>
		<button
			onclick={() => goto('/projects?new=1')}
			class="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
		>
			<Plus class="h-3.5 w-3.5" />
			Tambah Project
		</button>
		<button
			onclick={() => goto('/admin/settings')}
			class="flex items-center gap-1.5 rounded-xl border border-border/50 px-3 py-2 text-xs font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
			title="Ubah username & password"
		>
			<Settings2 class="h-3.5 w-3.5" />
			Pengaturan
		</button>
		<button
			onclick={handleLogout}
			class="flex items-center gap-1.5 rounded-xl border border-border/50 px-3 py-2 text-xs font-medium text-muted-foreground transition-all hover:border-destructive/40 hover:text-destructive"
		>
			<LogOut class="h-3.5 w-3.5" />
			Logout
		</button>
	</div>
{/if}
