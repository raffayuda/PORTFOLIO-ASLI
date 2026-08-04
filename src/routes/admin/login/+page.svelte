<script lang="ts">
	import { goto } from '$app/navigation';
	import { ArrowLeft, Lock, LogIn, ShieldCheck, User } from '@lucide/svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { onMount } from 'svelte';

	let username = $state('');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);
	let visible = $state(false);

	onMount(() => {
		visible = true;
	});

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		loading = true;
		try {
			const res = await fetch('/api/admin/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password })
			});
			const data = await res.json();
			if (!res.ok) {
				error = data.error || 'Login gagal';
				return;
			}
			goto('/');
		} catch (err) {
			error = 'Terjadi kesalahan jaringan, coba lagi.';
		} finally {
			loading = false;
		}
	}
</script>

<Seo title="Admin Login - Raffa Yuda Pratama" path="/admin/login" noindex />

<div class="flex min-h-screen items-center justify-center px-4 pt-24 pb-20">
	<div
		class="w-full max-w-md transition-all duration-700"
		class:opacity-100={visible}
		class:translate-y-0={visible}
		class:opacity-0={!visible}
		class:translate-y-8={!visible}
	>
		<a
			href="/"
			class="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
		>
			<ArrowLeft class="h-4 w-4" />
			Kembali ke Beranda
		</a>

		<form onsubmit={handleSubmit} class="glass rounded-2xl p-8">
			<div class="mb-6 text-center">
				<div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
					<ShieldCheck class="h-7 w-7 text-primary" />
				</div>
				<h1 class="text-2xl font-bold">
					Admin <span class="gradient-text">Panel</span>
				</h1>
				<p class="mt-1 text-xs text-muted-foreground">Masuk untuk mengelola project & komentar</p>
			</div>

			{#if error}
				<div class="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-xs font-medium text-destructive">
					{error}
				</div>
			{/if}

			<div class="space-y-4">
				<div class="relative">
					<User class="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<input
						type="text"
						bind:value={username}
						placeholder="Username"
						autocomplete="username"
						class="w-full rounded-xl border border-border/50 bg-background/50 py-2.5 pr-4 pl-10 text-sm outline-none backdrop-blur-sm transition-all focus:border-primary"
						required
					/>
				</div>
				<div class="relative">
					<Lock class="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<input
						type="password"
						bind:value={password}
						placeholder="Password"
						autocomplete="current-password"
						class="w-full rounded-xl border border-border/50 bg-background/50 py-2.5 pr-4 pl-10 text-sm outline-none backdrop-blur-sm transition-all focus:border-primary"
						required
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					class="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50"
				>
					{#if loading}
						<div class="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></div>
						<span>Memproses...</span>
					{:else}
						<LogIn class="h-4 w-4" />
						<span>Masuk</span>
					{/if}
				</button>
			</div>
		</form>

		<p class="mt-6 text-center text-[11px] text-muted-foreground">
			Kredensial admin diatur melalui variabel lingkungan <code class="rounded bg-muted px-1">ADMIN_USERNAME</code> &amp;
			<code class="rounded bg-muted px-1">ADMIN_PASSWORD</code> di <code class="rounded bg-muted px-1">.env</code>
		</p>
	</div>
</div>
