<script lang="ts">
	import { Plus, X } from '@lucide/svelte';
	import type { Project } from '$lib/types';
	import ImageUpload from '$lib/components/ImageUpload.svelte';

	let {
		project = null,
		onsaved = () => {},
		oncancel = () => {}
	}: {
		project?: Project | null;
		onsaved?: () => void;
		oncancel?: () => void;
	} = $props();

	const isEdit = !!project;

	// ── Form fields ──────────────────────────────
	let fTitleId = $state(project?.title.id || '');
	let fTitleEn = $state(project?.title.en || '');
	let fSlug = $state(project?.slug || '');
	let fDescriptionId = $state(project?.description.id || '');
	let fDescriptionEn = $state(project?.description.en || '');
	let fLongDescriptionId = $state(project?.longDescription.id || '');
	let fLongDescriptionEn = $state(project?.longDescription.en || '');
	let fImage = $state(project?.image || '');
	let fGallery = $state((project?.gallery || []).join(', '));
	let fTags = $state((project?.tags || []).join(', '));
	let fGithub = $state(project?.github || '');
	let fDemo = $state(project?.demo || '');
	let fCategory = $state(project?.category || 'web');
	let fFeaturesId = $state((project?.features?.id || []).join('\n'));
	let fFeaturesEn = $state((project?.features?.en || []).join('\n'));
	let fYear = $state(project?.year || new Date().getFullYear());
	let fPublished = $state(project?.published ?? true);

	let saving = $state(false);
	let error = $state('');

	const categories = ['web', 'mobile', 'ai', 'design', 'other'];

	const galleryItems = $derived(fGallery.split(',').map((s) => s.trim()).filter(Boolean));
	let galleryUploading = $state(false);
	let galleryUploadError = $state('');

	function addToGallery(url: string) {
		fGallery = fGallery ? `${fGallery}, ${url}` : url;
	}

	function removeFromGallery(url: string) {
		fGallery = fGallery.split(',').map((s) => s.trim()).filter((u) => u && u !== url).join(', ');
	}

	async function uploadToGallery(e: Event) {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;
		galleryUploading = true;
		galleryUploadError = '';
		try {
			const fd = new FormData();
			fd.append('file', file);
			const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
			const data = await res.json();
			if (!res.ok) {
				galleryUploadError = data.error || 'Upload gagal';
				return;
			}
			addToGallery(data.url);
		} catch (err) {
			galleryUploadError = 'Upload gagal, coba lagi.';
		} finally {
			galleryUploading = false;
			input.value = '';
		}
	}

	function slugify(text: string): string {
		return (
			text
				.toLowerCase()
				.trim()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/(^-|-$)/g, '') || ''
		);
	}

	function buildPayload(): Project {
		return {
			id: project?.id || '',
			slug: slugify(fSlug || fTitleEn || fTitleId),
			title: { id: fTitleId, en: fTitleEn },
			description: { id: fDescriptionId, en: fDescriptionEn },
			longDescription: { id: fLongDescriptionId, en: fLongDescriptionEn },
			image: fImage,
			gallery: fGallery.split(',').map((s) => s.trim()).filter(Boolean),
			tags: fTags.split(',').map((s) => s.trim()).filter(Boolean),
			github: fGithub || null,
			demo: fDemo || null,
			category: fCategory,
			features: {
				id: fFeaturesId.split('\n').map((s) => s.trim()).filter(Boolean),
				en: fFeaturesEn.split('\n').map((s) => s.trim()).filter(Boolean)
			},
			year: Number(fYear) || new Date().getFullYear(),
			published: fPublished
		};
	}

	async function save() {
		saving = true;
		error = '';
		try {
			const payload = buildPayload();
			const res = await fetch(
				isEdit ? `/api/admin/projects/${project!.id}` : '/api/admin/projects',
				{
					method: isEdit ? 'PATCH' : 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(payload)
				}
			);
			const data = await res.json();
			if (!res.ok) {
				error = data.error || (isEdit ? 'Gagal memperbarui project' : 'Gagal menambah project');
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
		<h2 class="text-lg font-bold">{isEdit ? '✏️ Edit Project' : '➕ Tambah Project Baru'}</h2>
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
			<ImageUpload value={fImage} label="Gambar Utama *" />
		</div>
		<div class="md:col-span-2">
			<div class="mb-1 flex items-center justify-between">
				<span class={labelClass}>Galeri Gambar</span>
				<label
					class="flex cursor-pointer items-center gap-1.5 rounded-lg border border-dashed border-border/60 px-3 py-1.5 text-xs text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
				>
					{#if galleryUploading}
						<div class="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
						Mengunggah...
					{:else}
						<Plus class="h-3.5 w-3.5" /> Tambah Gambar
					{/if}
					<input
						type="file"
						accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
						class="hidden"
						onchange={uploadToGallery}
						disabled={galleryUploading}
					/>
				</label>
			</div>
			{#if galleryItems.length > 0}
				<div class="flex flex-wrap gap-2">
					{#each galleryItems as url, i (url)}
						<div class="group relative flex-shrink-0">
							<img src={url} alt={`Galeri ${i + 1}`} class="h-16 w-20 rounded-lg border border-border/40 object-cover" />
							<button
								onclick={() => removeFromGallery(url)}
								class="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white opacity-0 transition-opacity group-hover:opacity-100"
								aria-label="Hapus gambar galeri"
							>
								<X class="h-3 w-3" />
							</button>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-xs text-muted-foreground/70">Belum ada gambar galeri.</p>
			{/if}
			{#if galleryUploadError}
				<p class="mt-1 text-[11px] font-medium text-destructive">{galleryUploadError}</p>
			{/if}
		</div>
		<div>
			<label class={labelClass}>Slug (kosongkan untuk auto)</label>
			<input bind:value={fSlug} class={inputClass} placeholder="coffee-shop-app" />
		</div>
		<div>
			<label class={labelClass}>Kategori</label>
			<select bind:value={fCategory} class={inputClass}>
				{#each categories as c}
					<option value={c}>{c.toUpperCase()}</option>
				{/each}
			</select>
		</div>
		<div class="md:col-span-2">
			<label class={labelClass}>Deskripsi Singkat (ID) *</label>
			<input bind:value={fDescriptionId} class={inputClass} placeholder="Deskripsi singkat dalam bahasa Indonesia" />
		</div>
		<div class="md:col-span-2">
			<label class={labelClass}>Deskripsi Singkat (EN) *</label>
			<input bind:value={fDescriptionEn} class={inputClass} placeholder="Short description in English" />
		</div>
		<div class="md:col-span-2">
			<label class={labelClass}>Deskripsi Panjang (ID)</label>
			<textarea bind:value={fLongDescriptionId} rows="3" class={inputClass} placeholder="Deskripsi lengkap dalam bahasa Indonesia"></textarea>
		</div>
		<div class="md:col-span-2">
			<label class={labelClass}>Deskripsi Panjang (EN)</label>
			<textarea bind:value={fLongDescriptionEn} rows="3" class={inputClass} placeholder="Full description in English"></textarea>
		</div>
		<div class="md:col-span-2">
			<label class={labelClass}>URL Gambar Utama *</label>
			<input bind:value={fImage} class={inputClass} placeholder="/images/projek1.png atau https://..." />
		</div>
		<div class="md:col-span-2">
			<label class={labelClass}>Galeri (pisahkan dengan koma)</label>
			<input bind:value={fGallery} class={inputClass} placeholder="/images/a.png, /images/b.png" />
		</div>
		<div class="md:col-span-2">
			<label class={labelClass}>Tags / Teknologi (pisahkan dengan koma)</label>
			<input bind:value={fTags} class={inputClass} placeholder="Next.js, TypeScript, Prisma" />
		</div>
		<div>
			<label class={labelClass}>URL GitHub</label>
			<input bind:value={fGithub} class={inputClass} placeholder="https://github.com/..." />
		</div>
		<div>
			<label class={labelClass}>URL Demo</label>
			<input bind:value={fDemo} class={inputClass} placeholder="https://...vercel.app" />
		</div>
		<div class="md:col-span-2">
			<label class={labelClass}>Fitur (ID) — satu per baris</label>
			<textarea bind:value={fFeaturesId} rows="3" class={inputClass} placeholder="Sistem pemesanan&#10;Manajemen menu"></textarea>
		</div>
		<div class="md:col-span-2">
			<label class={labelClass}>Fitur (EN) — satu per baris</label>
			<textarea bind:value={fFeaturesEn} rows="3" class={inputClass} placeholder="Ordering system&#10;Menu management"></textarea>
		</div>
		<div>
			<label class={labelClass}>Tahun</label>
			<input type="number" bind:value={fYear} class={inputClass} />
		</div>
		<div class="flex items-end pb-1">
			<label class="flex cursor-pointer items-center gap-2 text-sm font-medium">
				<input type="checkbox" bind:checked={fPublished} class="h-4 w-4 rounded border-border/50 text-primary focus:ring-primary" />
				Publikasikan (tampil di situs)
			</label>
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
			disabled={saving || !fTitleEn || !fTitleId}
			class="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50"
		>
			{#if saving}
				<div class="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></div>
				Menyimpan...
			{:else}
				{isEdit ? 'Simpan Perubahan' : 'Simpan Project'}
			{/if}
		</button>
	</div>
</div>
