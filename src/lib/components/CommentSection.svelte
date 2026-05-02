<script lang="ts">
	import { Send, Smile, X, Trash2 } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let { contextKey = 'general', title = 'Comments' }: { contextKey?: string; title?: string } = $props();

	interface Comment {
		id: string;
		name: string;
		message: string;
		createdAt: string;
		reactions: Record<string, number>;
	}

	let comments = $state<Comment[]>([]);
	let name = $state('');
	let message = $state('');
	let showEmojiPicker = $state(false);
	let loading = $state(true);
	let isSubmitting = $state(false);
	let userReactions = $state<Record<string, string>>({});

	const emojis = ['😀','😂','🔥','❤️','👍','👏','🎉','💯','🚀','✨','😍','🤔','👀','💪','🙏','⭐','💡','🎯','✅','😎'];

	onMount(() => {
		loadComments();
		const saved = localStorage.getItem('portfolio_reactions');
		if (saved) {
			try {
				userReactions = JSON.parse(saved);
			} catch (e) {}
		}
	});

	async function loadComments() {
		loading = true;
		try {
			const res = await fetch(`/api/comments?contextKey=${encodeURIComponent(contextKey)}`);
			if (res.ok) {
				const data = await res.json();
				comments = data.comments || [];
			}
		} catch (e) {
			console.error('Failed to load comments:', e);
		} finally {
			loading = false;
		}
	}

	async function addComment() {
		if (!message.trim() || isSubmitting) return;
		isSubmitting = true;
		try {
			const res = await fetch('/api/comments', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					contextKey,
					name: name.trim() || 'Anonymous',
					message: message.trim(),
				}),
			});
			if (res.ok) {
				const data = await res.json();
				comments = [data.comment, ...comments];
				message = '';
				showEmojiPicker = false;
			}
		} catch (e) {
			console.error('Failed to add comment:', e);
		} finally {
			isSubmitting = false;
		}
	}

	async function addReaction(commentId: string, emoji: string) {
		if (userReactions[commentId]) return;

		try {
			const res = await fetch('/api/comments/react', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ commentId, emoji }),
			});
			if (res.ok) {
				const data = await res.json();
				comments = comments.map(c =>
					c.id === commentId
						? { ...c, reactions: data.comment.reactions }
						: c
				);
				userReactions[commentId] = emoji;
				localStorage.setItem('portfolio_reactions', JSON.stringify(userReactions));
			}
		} catch (e) {
			console.error('Failed to add reaction:', e);
		}
	}

	async function deleteComment(commentId: string) {
		try {
			const res = await fetch(`/api/comments?id=${commentId}`, { method: 'DELETE' });
			if (res.ok) {
				comments = comments.filter(c => c.id !== commentId);
			}
		} catch (e) {
			console.error('Failed to delete comment:', e);
		}
	}

	function insertEmoji(emoji: string) {
		message += emoji;
		showEmojiPicker = false;
	}

	function timeAgo(dateStr: string): string {
		const diff = Date.now() - new Date(dateStr).getTime();
		const mins = Math.floor(diff / 60000);
		if (mins < 1) return 'just now';
		if (mins < 60) return `${mins}m ago`;
		const hrs = Math.floor(mins / 60);
		if (hrs < 24) return `${hrs}h ago`;
		const days = Math.floor(hrs / 24);
		if (days < 30) return `${days}d ago`;
		return new Date(dateStr).toLocaleDateString();
	}
</script>

<div class="comment-section">
	<h3 class="mb-4 text-sm font-bold">{title}</h3>

	<!-- Comment Form -->
	<div class="glass rounded-xl p-4">
		<div class="mb-3 flex gap-2">
			<input
				type="text"
				bind:value={name}
				placeholder="Your name (optional)"
				class="w-1/3 rounded-lg border border-border/50 bg-background/50 px-3 py-2 text-xs outline-none backdrop-blur-sm transition-all focus:border-primary"
			/>
			<div class="relative flex-1">
				<input
					type="text"
					bind:value={message}
					placeholder="Write a comment..."
					class="w-full rounded-lg border border-border/50 bg-background/50 px-3 py-2 pr-20 text-xs outline-none backdrop-blur-sm transition-all focus:border-primary disabled:opacity-50"
					onkeydown={(e) => { if (e.key === 'Enter' && message.trim() && !isSubmitting) addComment(); }}
					disabled={isSubmitting}
				/>
				<div class="absolute top-1/2 right-1.5 flex -translate-y-1/2 gap-1">
					<button
						onclick={() => (showEmojiPicker = !showEmojiPicker)}
						class="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
						aria-label="Emoji picker"
					>
						<Smile class="h-3.5 w-3.5" />
					</button>
					<button
						onclick={addComment}
						disabled={!message.trim() || isSubmitting}
						class="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground transition-all disabled:opacity-40"
						aria-label="Send comment"
					>
						{#if isSubmitting}
							<div class="h-3 w-3 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></div>
						{:else}
							<Send class="h-3 w-3" />
						{/if}
					</button>
				</div>
			</div>
		</div>

		<!-- Emoji Picker -->
		{#if showEmojiPicker}
			<div class="glass-subtle relative rounded-lg p-2">
				<button
					onclick={() => (showEmojiPicker = false)}
					class="absolute top-1 right-1 text-muted-foreground hover:text-foreground"
				>
					<X class="h-3 w-3" />
				</button>
				<div class="flex flex-wrap gap-1">
					{#each emojis as emoji}
						<button
							onclick={() => insertEmoji(emoji)}
							class="flex h-8 w-8 items-center justify-center rounded-md text-base transition-transform hover:scale-125 hover:bg-accent"
						>
							{emoji}
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<!-- Comments List -->
	{#if loading}
		<div class="mt-4 flex justify-center">
			<div class="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
		</div>
	{:else if comments.length > 0}
		<div class="mt-4 space-y-3">
			{#each comments as comment (comment.id)}
				<div class="group glass-subtle rounded-xl p-3 transition-all">
					<div class="mb-1.5 flex items-center justify-between">
						<div class="flex items-center gap-2">
							<div class="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
								{comment.name.charAt(0).toUpperCase()}
							</div>
							<span class="text-xs font-semibold">{comment.name}</span>
							<span class="text-[10px] text-muted-foreground">{timeAgo(comment.createdAt)}</span>
						</div>
						<button
							onclick={() => deleteComment(comment.id)}
							class="opacity-0 transition-opacity group-hover:opacity-100"
							aria-label="Delete"
						>
							<Trash2 class="h-3 w-3 text-muted-foreground hover:text-destructive" />
						</button>
					</div>

					<p class="mb-2 text-xs leading-relaxed text-foreground/85">{comment.message}</p>

					<!-- Reaction bar -->
					<div class="flex flex-wrap items-center gap-1">
						{#each Object.entries(comment.reactions || {}) as [emoji, count]}
							<button
								onclick={() => addReaction(comment.id, emoji)}
								disabled={!!userReactions[comment.id]}
								class="flex items-center gap-0.5 rounded-full border px-1.5 py-0.5 text-[10px] transition-all {userReactions[comment.id] === emoji ? 'border-primary bg-primary/10 text-primary' : 'border-border/50 bg-accent/50'} {!userReactions[comment.id] ? 'hover:border-primary/40' : 'cursor-default'}"
							>
								<span>{emoji}</span>
								<span class="font-medium">{count}</span>
							</button>
						{/each}
						<!-- Quick reaction buttons -->
						{#if !userReactions[comment.id]}
							<div class="ml-1 flex gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
								{#each ['👍', '❤️', '🔥', '😂'] as emoji}
									<button
										onclick={() => addReaction(comment.id, emoji)}
										class="flex h-5 w-5 items-center justify-center rounded-full text-[10px] transition-transform hover:scale-125 hover:bg-accent"
									>
										{emoji}
									</button>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p class="mt-4 text-center text-xs text-muted-foreground">No comments yet. Be the first! 💬</p>
	{/if}
</div>
