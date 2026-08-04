<script lang="ts">
	import { X } from '@lucide/svelte';

	interface GalleryItem {
		id: string;
		type: string;
		titleId: string;
		titleEn: string;
		descId: string;
		descEn: string;
		issuer: string | null;
		date: string;
		imageUrl: string;
		sortOrder: number;
	}

	let {
		item = null,
		onsaved = () => {},
		oncancel = () => {}
	}: {
		item?: GalleryItem | null;
		onsaved?: () => void;
		oncancel?: () => void;
	} = $props();

	const isEdit = !!item;

	let fType = $state(item?.type || 'certificate');
	let fTitleId = $state(item?.titleId || '');
	let fTitleEn = $state(item?.titleEn || '');
	let fDescId = $state(item?.descId || '');
	let fDescEn = $state(item?.descEn || '');
	let fIssuer = $state(item?.issuer || '');
	let fDate = $state(item?.date || '');
	let fImageUrl = $state(item?.imageUrl || '');
	let fSortOrder = $state(item?.sortOrder ?? 0);

	let saving = $state(false);
	let error = $state('');

	async function save() {
		saving = true;
		error = '';
		try {
			const payload = {
				type: fType,
				titleId: fTitleId,
				titleEn: fTitleEn,
				descId: fDescId,
				descEn: fDescEn,
				issuer: fIssuer || null,
				date: fDate,
				imageUrl: fImageUrl,
				sortOrder: Number(fSortOrder) || 0
			};

			const res = await fetch(isEdit ? `/api/gallery?id=${item!.id}` : '/api/gallery', {
				method: isEdit ? 'PATCH' : 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});
			const data = await res.json();

			if (!res.ok) {
				error = data.error || (isEdit ? 'Gagal memperbarui item' : 'Gagal menambah item');
				return;
			}
			onsaved();
		} catch (e) {
			error = 'Terjadi kesalahan, coba lagi.';
		} finally {
			saving = false;
		}
	}

	const inputClass =
		'w-full rounded-xl border border-border/50 bg-background/50 px-3 py-2 text-sm outline-none backdrop-blur-sm transition-all focus:border-primary';
	const labelClass = 'mb-1 block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground';
</script>

<div class="glass mb-8 rounded-2xl p-6">
	<div class="mb-5 flex items-center justify-between">
		<h2 class="text-lg font-bold">{isEdit ? '✏️ Edit Item Galeri' : '➕ Tambah Item Galeri'}</h2>
		<button onclick={oncancel} class="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="Tutup">
			<X class="h-4 w-4" />
		</button>
	</div>

	{#if error}
		<div class="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
			{error}
		</div>
	{/if}

	<div class="grid gap-4 md:grid-cols-2">
		<div>
			<label class={labelClass}>Tipe *</label>
			<select bind:value={fType} class={inputClass}>
				<option value="certificate">Sertifikat</option>
				<option value="documentation">Dokumentasi</option>
			</select>
		</div>
		<div>
			<label class={labelClass}>Tanggal *</label>
			<input bind:value={fDate} class={inputClass} placeholder="cth: 2024 / 2024-05" />
		</div>
		<div>
			<label class={labelClass}>Judul (Indonesia) *</label>
			<input bind:value={fTitleId} class={inputClass} placeholder="Judul dalam bahasa Indonesia" />
		</div>
		<div>
			<label class={labelClass}>Judul (English) *</label>
			<input bind:value={fTitleEn} class={inputClass} placeholder="Title in English" />
		</div>
		<div class="md:col-span-2">
			<label class={labelClass}>Deskripsi (ID)</label>
			<input bind:value={fDescId} class={inputClass} placeholder="Deskripsi dalam bahasa Indonesia" />
		</div>
		<div class="md:col-span-2">
			<label class={labelClass}>Deskripsi (EN)</label>
			<input bind:value={fDescEn} class={inputClass} placeholder="Description in English" />
		</div>
		<div>
			<label class={labelClass}>Penerbit (hanya untuk sertifikat)</label>
			<input bind:value={fIssuer} class={inputClass} placeholder="cth: Dicoding Indonesia" />
		</div>
		<div>
			<label class={labelClass}>Urutan (sortOrder)</label>
			<input type="number" bind:value={fSortOrder} class={inputClass} />
		</div>
		<div class="md:col-span-2">
			<label class={labelClass}>URL Gambar *</label>
			<input bind:value={fImageUrl} class={inputClass} placeholder="/images/certificates/cert-1.jpg atau https://..." />
		</div>
	</div>

	<div class="mt-6 flex justify-end gap-3">
		<button
			onclick={oncancel}
			class="rounded-xl border border-border/50 px-5 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:border-border hover:text-foreground"
		>
			Batal
		</button>
		<button
			onclick={save}
			disabled={saving || !fTitleId || !fTitleEn || !fImageUrl}
			class="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50"
		>
			{#if saving}
				<div class="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></div>
				Menyimpan...
			{:else}
				{isEdit ? 'Simpan Perubahan' : 'Simpan Item'}
			{/if}
		</button>
	</div>
</div>
