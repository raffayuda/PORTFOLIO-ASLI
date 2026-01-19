<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import { playlist, type Song } from '$lib/data/music';
	import { language } from '$lib/stores/language';
	import { translations } from '$lib/translations';
	import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, ExternalLink } from '@lucide/svelte';
	import { onMount, onDestroy } from 'svelte';

	let currentSong = $state<Song>(playlist[0]);
	let currentIndex = $state(0);
	let isPlaying = $state(false);
	let currentTime = $state(0);
	let duration = $state(0);
	let volume = $state(0.7);
	let audio: HTMLAudioElement;
	let isFavorite = $state(false);

	// Reactive translations
	const t = $derived(translations[$language].music);

	function playSong(song: Song, index: number) {
		currentSong = song;
		currentIndex = index;
		isPlaying = true;
		if (audio) {
			audio.src = song.audioUrl;
			audio.play();
		}
	}

	function togglePlay() {
		if (isPlaying) {
			audio?.pause();
		} else {
			audio?.play();
		}
		isPlaying = !isPlaying;
	}

	function nextSong() {
		const nextIndex = (currentIndex + 1) % playlist.length;
		playSong(playlist[nextIndex], nextIndex);
	}

	function prevSong() {
		const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
		playSong(playlist[prevIndex], prevIndex);
	}

	function handleTimeUpdate() {
		if (audio) {
			currentTime = audio.currentTime;
			duration = audio.duration;
		}
	}

	function handleSeek(e: Event) {
		const target = e.target as HTMLInputElement;
		const time = parseFloat(target.value);
		if (audio) {
			audio.currentTime = time;
			currentTime = time;
		}
	}

	function handleVolumeChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const newVolume = parseFloat(target.value);
		volume = newVolume;
		if (audio) {
			audio.volume = newVolume;
		}
	}

	function formatTime(seconds: number): string {
		if (isNaN(seconds)) return '0:00';
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	onMount(() => {
		audio = new Audio(currentSong.audioUrl);
		audio.volume = volume;
		audio.addEventListener('timeupdate', handleTimeUpdate);
		audio.addEventListener('ended', nextSong);
	});

	onDestroy(() => {
		if (audio) {
			audio.pause();
			audio.removeEventListener('timeupdate', handleTimeUpdate);
			audio.removeEventListener('ended', nextSong);
		}
	});
</script>

<svelte:head>
	<title>Music Player - My Playlist</title>
</svelte:head>

<Navbar />

<div
	class="min-h-screen bg-gradient-to-br from-purple-500/10 via-background to-blue-500/10 px-4 pt-24 pb-12 lg:pb-12"
>
	<div class="container mx-auto max-w-6xl pb-24 lg:pb-0">
		<!-- Header -->
		<div class="mb-8 text-center">
			<h1 class="mb-2 text-3xl font-bold md:text-4xl">
				{t.title}
				<span
					class="bg-gradient-to-r from-black to-blue-600 bg-clip-text text-transparent dark:from-white"
					>{t.playlist}</span
				>
			</h1>
			<p class="text-muted-foreground">{t.subtitle}</p>
		</div>

		<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
			<!-- Current Playing -->
			<div class="hidden lg:col-span-1 lg:block">
				<div class="sticky top-24 rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm">
					<!-- Album Cover -->
					<div
						class="mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-white to-blue-500/20"
					>
						<img src={currentSong.cover} alt="" class="h-full w-full object-cover" />
					</div>

					<h3 class="mb-1 text-lg font-bold">{currentSong.title}</h3>
					<p class="mb-4 text-sm text-muted-foreground">{currentSong.artist}</p>

					<!-- Progress Bar -->
					<div class="mb-4 space-y-2">
						<input
							type="range"
							min="0"
							max={duration || 100}
							value={currentTime}
							oninput={handleSeek}
							class="h-1 w-full cursor-pointer appearance-none rounded-lg bg-muted [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
						/>
						<div class="flex justify-between text-xs text-muted-foreground">
							<span>{formatTime(currentTime)}</span>
							<span>{formatTime(duration)}</span>
						</div>
					</div>

					<!-- Controls -->
					<div class="mb-4 flex items-center justify-center gap-4">
						<button
							onclick={prevSong}
							class="rounded-full p-2 transition-colors hover:bg-accent"
							aria-label="Previous"
						>
							<SkipBack class="h-5 w-5" />
						</button>

						<button
							onclick={togglePlay}
							class="rounded-full bg-primary p-4 text-primary-foreground transition-transform hover:scale-105"
							aria-label={isPlaying ? 'Pause' : 'Play'}
						>
							{#if isPlaying}
								<Pause class="h-6 w-6" />
							{:else}
								<Play class="h-6 w-6" />
							{/if}
						</button>

						<button
							onclick={nextSong}
							class="rounded-full p-2 transition-colors hover:bg-accent"
							aria-label="Next"
						>
							<SkipForward class="h-5 w-5" />
						</button>
					</div>

					<!-- Volume -->
					<div class="flex items-center gap-2">
						<Volume2 class="h-4 w-4 text-muted-foreground" />
						<input
							type="range"
							min="0"
							max="1"
							step="0.01"
							value={volume}
							oninput={handleVolumeChange}
							class="h-1 flex-1 cursor-pointer appearance-none rounded-lg bg-muted [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
						/>
					</div>
				</div>
			</div>

			<!-- Playlist -->
			<div class="lg:col-span-2">
				<div class="rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm">
					<h2 class="mb-4 text-xl font-bold">{t.playlist} ({playlist.length} {t.songs})</h2>

					<div class="space-y-2">
						{#each playlist as song, index}
							<button
								onclick={() => playSong(song, index)}
								class="group flex w-full items-center gap-4 rounded-lg p-3 text-left transition-colors hover:bg-accent {currentIndex ===
								index
									? 'bg-primary/10'
									: ''}"
							>
								<div
									class="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded bg-gradient-to-br from-white to-blue-500/20"
								>
									<img src={song.cover} alt="" class="absolute z-0 h-full w-full object-cover" />
									{#if currentIndex === index && isPlaying}
										<Pause class="z-10 h-5 w-5" />
									{:else}
										<Play class="z-10 h-5 w-5" />
									{/if}
								</div>

								<div class="min-w-0 flex-1">
									<h3 class="truncate font-semibold {currentIndex === index ? 'text-primary' : ''}">
										{song.title}
									</h3>
									<p class="truncate text-sm text-muted-foreground">
										{song.artist} • {song.album}
									</p>
								</div>

								<div class="flex-shrink-0 text-sm text-muted-foreground">
									{song.duration}
								</div>

								<div
									onclick={(e) => {
										e.stopPropagation();
										isFavorite = !isFavorite;
									}}
									role="button"
									tabindex="0"
									class="flex-shrink-0 cursor-pointer p-2 opacity-0 transition-opacity group-hover:opacity-100"
									aria-label={t.addToFavorites}
								>
									<Heart class="h-4 w-4" />
								</div>
							</button>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Mobile Floating Player Bar (Fixed at Bottom) -->
<div
	class="fixed right-0 bottom-0 left-0 z-50 border-t border-border bg-card/95 p-3 shadow-2xl backdrop-blur-lg lg:hidden"
>
	<div class="flex items-center gap-3">
		<!-- Album Cover Thumbnail -->
		<div
			class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded bg-gradient-to-br from-purple-500/20 to-blue-500/20"
		>
			<img src={currentSong.cover} alt="">
		</div>

		<!-- Song Info -->
		<div class="min-w-0 flex-1">
			<h3 class="truncate text-sm font-semibold">{currentSong.title}</h3>
			<p class="truncate text-xs text-muted-foreground">{currentSong.artist}</p>
		</div>

		<!-- Playback Controls -->
		<div class="flex flex-shrink-0 items-center gap-2">
			<button
				onclick={prevSong}
				class="rounded-full p-2 transition-colors hover:bg-accent"
				aria-label="Previous"
			>
				<SkipBack class="h-5 w-5" />
			</button>

			<button
				onclick={togglePlay}
				class="rounded-full bg-primary p-3 text-primary-foreground transition-transform hover:scale-105"
				aria-label={isPlaying ? 'Pause' : 'Play'}
			>
				{#if isPlaying}
					<Pause class="h-5 w-5" />
				{:else}
					<Play class="h-5 w-5" />
				{/if}
			</button>

			<button
				onclick={nextSong}
				class="rounded-full p-2 transition-colors hover:bg-accent"
				aria-label="Next"
			>
				<SkipForward class="h-5 w-5" />
			</button>
		</div>
	</div>

	<!-- Progress Bar -->
	<div class="mt-2">
		<input
			type="range"
			min="0"
			max={duration || 100}
			value={currentTime}
			oninput={handleSeek}
			class="h-1 w-full cursor-pointer appearance-none rounded-lg bg-muted [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
		/>
	</div>
</div>
