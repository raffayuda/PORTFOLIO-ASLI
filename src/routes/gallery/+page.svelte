<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import GalleryForm from '$lib/components/GalleryForm.svelte';
	import { language } from '$lib/stores/language';
	import { admin } from '$lib/stores/admin';
	import { translations } from '$lib/translations';
	import { Award, Camera, X, ChevronLeft, ChevronRight, ExternalLink, Pencil, Plus, ShieldCheck, Trash2 } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let visible = $state(false);
	let selectedImage = $state<any>(null);
	let selectedIndex = $state(-1);
	let activeTab = $state<'certificate' | 'documentation'>('certificate');
	let items = $state<any[]>([]);
	let loading = $state(true);
	let showForm = $state(false);
	let editing = $state<any>(null);
	let notice = $state('');
	let noticeError = $state('');

	const t = $derived(translations[$language].gallery);

	const currentItems = $derived(items.filter(i => i.type === activeTab));

	function openNew() {
		editing = null;
		showForm = true;
		notice = '';
		noticeError = '';
	}

	function openEdit(item: any) {
		editing = item;
		showForm = true;
		notice = '';
		noticeError = '';
	}

	function closeForm() {
		showForm = false;
		editing = null;
	}

	async function onSaved() {
		notice = 'Item galeri berhasil disimpan ✅';
		showForm = false;
		editing = null;
		await fetchGallery();
	}

	async function deleteItem(item: any) {
		if (!confirm(`Hapus "${item.titleId}" dari galeri?`)) return;
		try {
			const res = await fetch(`/api/gallery?id=${item.id}`, { method: 'DELETE' });
			if (res.ok) {
				notice = `"${item.titleId}" dihapus 🗑️`;
				await fetchGallery();
			} else {
				noticeError = 'Gagal menghapus item';
			}
		} catch (e) {
			noticeError = 'Terjadi kesalahan, coba lagi.';
		}
	}

	async function fetchGallery() {
		loading = true;
		try {
			const res = await fetch('/api/gallery');
			if (res.ok) {
				const data = await res.json();
				items = data.items || [];
			}
		} catch (e) {
			console.error('Failed to load gallery:', e);
		} finally {
			loading = false;
		}
	}

	function openLightbox(item: any, index: number) {
		selectedImage = item;
		selectedIndex = index;
		document.body.style.overflow = 'hidden';
	}

	function closeLightbox() {
		selectedImage = null;
		selectedIndex = -1;
		document.body.style.overflow = '';
	}

	function navigateLightbox(direction: number) {
		const newIndex = selectedIndex + direction;
		if (newIndex >= 0 && newIndex < currentItems.length) {
			selectedIndex = newIndex;
			selectedImage = currentItems[newIndex];
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!selectedImage) return;
		if (e.key === 'Escape') closeLightbox();
		if (e.key === 'ArrowLeft') navigateLightbox(-1);
		if (e.key === 'ArrowRight') navigateLightbox(1);
	}

	function getTitle(item: any): string {
		return $language === 'id' ? item.titleId : item.titleEn;
	}

	function getDesc(item: any): string {
		return $language === 'id' ? item.descId : item.descEn;
	}

	onMount(() => {
		visible = true;
		admin.check();
		fetchGallery();
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<svelte:head>
	<title>{t.title} - Raffa Yuda Pratama</title>
	<meta name="description" content={$language === 'id' ? 'Galeri sertifikat dan dokumentasi kegiatan Raffa Yuda Pratama.' : 'Gallery of certificates and activity documentation by Raffa Yuda Pratama.'} />
</svelte:head>

<div class="min-h-screen page-enter">
	<Navbar />

	<main class="pt-24 pb-20">
		<div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			<!-- Header -->
			<div
				class="mb-10 transition-all duration-700"
				class:opacity-100={visible}
				class:translate-y-0={visible}
				class:opacity-0={!visible}
				class:translate-y-8={!visible}
			>
				<h1 class="mb-3 text-4xl font-bold md:text-5xl">
					{t.title.split(' ')[0]}
					<span class="gradient-text">{t.title.split(' ').slice(1).join(' ')}</span>
				</h1>
				<p class="max-w-lg text-sm text-muted-foreground">{t.subtitle}</p>
			</div>

			<!-- Tab Switcher -->
			<div
				class="mb-10 flex gap-2 transition-all delay-100 duration-700"
				class:opacity-100={visible}
				class:opacity-0={!visible}
			>
				<button
					onclick={() => activeTab = 'certificate'}
					class="tab-btn flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all"
					class:tab-active={activeTab === 'certificate'}
				>
					<Award class="h-4 w-4" />
					{t.certificates}
				</button>
				<button
					onclick={() => activeTab = 'documentation'}
					class="tab-btn flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all"
					class:tab-active={activeTab === 'documentation'}
				>
					<Camera class="h-4 w-4" />
					{t.documentation}
				</button>
			</div>

			<!-- Admin controls (only when logged in) -->
			{#if $admin.authenticated}
				<div class="mb-8">
					<div class="mb-3 flex flex-wrap items-center justify-between gap-3">
						<div class="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
							<ShieldCheck class="h-3.5 w-3.5" />
							Mode Admin — {items.length} item
						</div>
						<button
							onclick={openNew}
							class="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
						>
							<Plus class="h-4 w-4" /> Tambah Item
						</button>
					</div>
					{#if notice}
						<div class="mb-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
							{notice}
						</div>
					{/if}
					{#if noticeError}
						<div class="mb-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-sm font-medium text-destructive">
							{noticeError}
						</div>
					{/if}
				</div>

				{#if showForm}
					{#key editing?.id ?? 'new'}
						<GalleryForm item={editing} onsaved={onSaved} oncancel={closeForm} />
					{/key}
				{/if}
			{/if}

			<!-- Gallery Grid -->
			{#if loading}
				<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{#each Array(3) as _}
						<div class="glass h-64 animate-pulse rounded-2xl"></div>
					{/each}
				</div>
			{:else if currentItems.length > 0}
				<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{#each currentItems as item, i (item.id)}
						<button
							class="gallery-card glass group cursor-pointer overflow-hidden rounded-2xl text-left transition-all duration-500 hover:-translate-y-2"
							style="transition-delay: {i * 80}ms"
							class:opacity-100={visible}
							class:translate-y-0={visible}
							class:opacity-0={!visible}
							class:translate-y-8={!visible}
							onclick={() => openLightbox(item, i)}
						>
							<div class="relative aspect-[4/3] overflow-hidden">
								<img
									src={item.imageUrl}
									alt={getTitle(item)}
									class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
									onerror={(e) => {
										const target = e.target as HTMLImageElement;
										target.style.display = 'none';
										target.parentElement!.classList.add('placeholder-bg');
									}}
								/>
								<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
								<div class="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm opacity-0 transition-all duration-300 group-hover:opacity-100">
									<ExternalLink class="h-4 w-4 text-white" />
								</div>
							</div>
							<div class="p-4">
								<h3 class="mb-1 text-sm font-bold transition-colors group-hover:text-primary">
									{getTitle(item)}
								</h3>
								{#if item.issuer}
									<p class="mb-1 text-xs font-medium text-primary/80">{item.issuer}</p>
								{/if}
								<p class="text-xs text-muted-foreground">{getDesc(item)}</p>
								<p class="mt-2 text-[10px] text-muted-foreground/60">{item.date}</p>
								{#if $admin.authenticated}
									<div class="mt-2 flex items-center gap-1.5 border-t border-border/30 pt-2" onclick={(e) => e.stopPropagation()}>
										<button
											onclick={(e) => { e.stopPropagation(); openEdit(item); }}
											class="flex h-7 w-7 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
											aria-label="Edit"
										>
											<Pencil class="h-3.5 w-3.5" />
										</button>
										<button
											onclick={(e) => { e.stopPropagation(); deleteItem(item); }}
											class="flex h-7 w-7 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-all hover:border-destructive/40 hover:text-destructive"
											aria-label="Hapus"
										>
											<Trash2 class="h-3.5 w-3.5" />
										</button>
									</div>
								{/if}
							</div>
						</button>
					{/each}
				</div>
			{:else}
				<div class="glass flex h-64 flex-col items-center justify-center rounded-2xl text-center">
					<div class="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
						{#if activeTab === 'certificate'}
							<Award class="h-7 w-7 text-primary" />
						{:else}
							<Camera class="h-7 w-7 text-primary" />
						{/if}
					</div>
					<p class="text-sm text-muted-foreground">{t.emptyState}</p>
				</div>
			{/if}

			<!-- Info Note -->
			<div
				class="glass mt-10 rounded-2xl p-5 text-center transition-all delay-500 duration-700"
				class:opacity-100={visible}
				class:opacity-0={!visible}
			>
				<p class="text-xs text-muted-foreground">
					{t.note}
				</p>
			</div>
		</div>
	</main>

	<!-- Lightbox Modal -->
	{#if selectedImage}
		<div
			class="lightbox-overlay"
			role="dialog"
			aria-modal="true"
			tabindex="0"
			onclick={closeLightbox}
			onkeydown={(e) => { if (e.key === 'Escape') closeLightbox(); }}
		>
			<button
				class="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
				onclick={closeLightbox}
				aria-label="Close"
			>
				<X class="h-5 w-5" />
			</button>

			{#if selectedIndex > 0}
				<button
					class="lightbox-nav lightbox-nav-left"
					onclick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
					aria-label="Previous"
				>
					<ChevronLeft class="h-6 w-6" />
				</button>
			{/if}

			{#if selectedIndex < currentItems.length - 1}
				<button
					class="lightbox-nav lightbox-nav-right"
					onclick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
					aria-label="Next"
				>
					<ChevronRight class="h-6 w-6" />
				</button>
			{/if}

			<div class="lightbox-content" onclick={(e) => e.stopPropagation()}>
				<img
					src={selectedImage.imageUrl}
					alt={getTitle(selectedImage)}
					class="lightbox-image"
				/>
				<div class="mt-4 text-center">
					<h3 class="text-lg font-bold text-white">{getTitle(selectedImage)}</h3>
					{#if selectedImage.issuer}
						<p class="text-sm text-white/70">{selectedImage.issuer} · {selectedImage.date}</p>
					{:else}
						<p class="text-sm text-white/70">{selectedImage.date}</p>
					{/if}
					<p class="mt-1 text-xs text-white/50">{getDesc(selectedImage)}</p>
				</div>
			</div>
		</div>
	{/if}

	<Footer />
</div>

<style>
	.tab-btn {
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		color: var(--muted-foreground);
	}
	.tab-btn:hover {
		color: var(--foreground);
		border-color: oklch(0.685 0.169 222 / 0.3);
	}
	.tab-active {
		background: oklch(0.685 0.169 222 / 0.12) !important;
		color: oklch(0.685 0.169 222) !important;
		border-color: oklch(0.685 0.169 222 / 0.3) !important;
		font-weight: 600;
	}

	.placeholder-bg {
		background: linear-gradient(135deg, oklch(0.685 0.169 222 / 0.1), oklch(0.685 0.169 222 / 0.05));
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.placeholder-bg::after {
		content: '📷';
		font-size: 2rem;
		opacity: 0.5;
	}

	.gallery-card {
		border: none;
		padding: 0;
	}

	.lightbox-overlay {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.9);
		backdrop-filter: blur(8px);
		animation: fadeIn 0.2s ease;
	}
	.lightbox-content {
		max-width: 90vw;
		max-height: 85vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.lightbox-image {
		max-width: 100%;
		max-height: 70vh;
		object-fit: contain;
		border-radius: 12px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
	}
	.lightbox-nav {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 10;
		display: flex;
		height: 44px;
		width: 44px;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.1);
		color: white;
		backdrop-filter: blur(4px);
		transition: all 0.2s ease;
		border: none;
		cursor: pointer;
	}
	.lightbox-nav:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: translateY(-50%) scale(1.1);
	}
	.lightbox-nav-left { left: 16px; }
	.lightbox-nav-right { right: 16px; }

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}
</style>
