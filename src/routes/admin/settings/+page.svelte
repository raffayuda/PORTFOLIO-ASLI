<script lang="ts">
	import { goto } from '$app/navigation';
	import { ArrowLeft, KeyRound, LogOut, Save, UserRound, ShieldCheck } from '@lucide/svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { onMount } from 'svelte';

	let { data } = $props();

	let currentUsername = $state(data.username);
	let currentPassword = $state('');
	let newUsername = $state(data.username);
	let newPassword = $state('');
	let loading = $state(false);
	let success = $state('');
	let error = $state('');
	let visible = $state(false);

	onMount(() => {
		visible = true;
	});

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		loading = true;
		success = '';
		error = '';
		try {
			const res = await fetch('/api/admin/account', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					currentPassword,
					newUsername: newUsername !== currentUsername ? newUsername : undefined,
					newPassword: newPassword || undefined
				})
			});
			const dataRes = await res.json();
			if (!res.ok) {
				error = dataRes.error || 'Gagal memperbarui akun';
				return;
			}
			currentUsername = dataRes.username;
			newUsername = dataRes.username;
			currentPassword = '';
			newPassword = '';
			success = 'Akun admin berhasil diperbarui ✅';
		} catch (err) {
			error = 'Terjadi kesalahan, coba lagi.';
		} finally {
			loading = false;
		}
	}

	async function logout() {
		await fetch('/api/admin/logout', { method: 'POST' });
		window.location.href = '/';
	}

	const inputClass =
		'w-full rounded-xl border border-border/50 bg-background/50 px-3 py-2.5 pl-10 text-sm outline-none backdrop-blur-sm transition-all focus:border-primary';
	const labelClass = 'mb-1 block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground';
</script>

<Seo title="Pengaturan Akun Admin - Raffa Yuda Pratama" path="/admin/settings" noindex />

<div
	class="flex min-h-screen items-center justify-center px-4 pt-24 pb-20 transition-opacity duration-700"
	class:opacity-100={visible}
	class:opacity-0={!visible}
>
	<div class="w-full max-w-md">
		<div class="mb-6 flex items-center justify-between">
			<a href="/" class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
				<ArrowLeft class="h-4 w-4" /> Kembali ke Situs
			</a>
			<button
				onclick={logout}
				class="flex items-center gap-1.5 rounded-lg border border-border/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-destructive/40 hover:text-destructive"
			>
				<LogOut class="h-3.5 w-3.5" /> Logout
			</button>
		</div>

		<form onsubmit={handleSubmit} class="glass rounded-2xl p-8">
			<div class="mb-6 text-center">
				<div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
					<ShieldCheck class="h-7 w-7 text-primary" />
				</div>
				<h1 class="text-2xl font-bold">
					Pengaturan <span class="gradient-text">Akun Admin</span>
				</h1>
				<p class="mt-1 text-xs text-muted-foreground">Ubah username & password akun admin</p>
			</div>

			{#if success}
				<div class="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-600 dark:text-emerald-400">
					{success}
				</div>
			{/if}
			{#if error}
				<div class="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
					{error}
				</div>
			{/if}

			<div class="space-y-4">
				<div>
					<label class={labelClass}>Username Saat Ini</label>
					<div class="relative">
						<UserRound class="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<input type="text" value={currentUsername} disabled class="{inputClass} opacity-60" />
					</div>
				</div>
				<div>
					<label class={labelClass}>Username Baru</label>
					<div class="relative">
						<UserRound class="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<input type="text" bind:value={newUsername} class={inputClass} placeholder="username baru" autocomplete="username" />
					</div>
				</div>
				<div>
					<label class={labelClass}>Password Saat Ini *</label>
					<div class="relative">
						<KeyRound class="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<input type="password" bind:value={currentPassword} class={inputClass} placeholder="wajib untuk verifikasi" autocomplete="current-password" required />
					</div>
				</div>
				<div>
					<label class={labelClass}>Password Baru (min. 6 karakter)</label>
					<div class="relative">
						<KeyRound class="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<input type="password" bind:value={newPassword} class={inputClass} placeholder="kosongkan jika tidak diganti" autocomplete="new-password" />
					</div>
				</div>

				<button
					type="submit"
					disabled={loading || !currentPassword}
					class="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50"
				>
					{#if loading}
						<div class="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></div>
						Menyimpan...
					{:else}
						<Save class="h-4 w-4" /> Simpan Perubahan
					{/if}
				</button>
			</div>
		</form>

		<p class="mt-6 text-center text-[11px] text-muted-foreground">
			Jangan lupa gunakan username &amp; password baru saat login berikutnya.
		</p>
	</div>
</div>
