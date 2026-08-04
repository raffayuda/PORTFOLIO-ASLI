<script lang="ts">
	import { ImageUp, X } from '@lucide/svelte';

	let {
		value = '',
		label = 'Gambar',
		compact = false
	}: {
		value?: string;
		label?: string;
		compact?: boolean;
	} = $props();

	let uploading = $state(false);
	let error = $state('');

	async function handleFile(e: Event) {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;

		uploading = true;
		error = '';
		try {
			const fd = new FormData();
			fd.append('file', file);
			const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
			const data = await res.json();
			if (!res.ok) {
				error = data.error || 'Upload gagal';
				return;
			}
			value = data.url;
		} catch (err) {
			error = 'Upload gagal, coba lagi.';
		} finally {
			uploading = false;
			input.value = '';
		}
	}

	function clear() {
		value = '';
	}

	const labelClass = 'mb-1 block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground';
</script>

<div>
	{#if label}
		<label class={labelClass}>{label}</label>
	{/if}

	<div class="flex items-start gap-3">
		{#if value}
			<div class="relative flex-shrink-0">
				<img
					src={value}
					alt="Preview"
					class="{compact ? 'h-16 w-20' : 'h-24 w-32'} rounded-xl border border-border/40 object-cover"
				/>
				<button
					onclick={clear}
					class="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-white shadow-lg transition-transform hover:scale-110"
					aria-label="Hapus gambar"
				>
					<X class="h-3.5 w-3.5" />
				</button>
			</div>
		{/if}

		<div class="min-w-0 flex-1">
			<label
				class="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-border/60 px-4 py-3 text-sm text-muted-foreground transition-all hover:border-primary/40 hover:text-primary {value ? 'w-max' : ''}"
			>
				{#if uploading}
					<div class="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
					<span>Mengunggah...</span>
				{:else}
					<ImageUp class="h-4 w-4" />
					<span>{value ? 'Ganti Gambar' : 'Pilih Gambar'}</span>
				{/if}
				<input type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/avif,image/svg+xml" class="hidden" onchange={handleFile} disabled={uploading} />
			</label>
			{#if error}
				<p class="mt-1 text-[11px] font-medium text-destructive">{error}</p>
			{/if}
			{#if value}
				<p class="mt-1 truncate text-[10px] text-muted-foreground/70">{value}</p>
			{/if}
		</div>
	</div>
</div>
