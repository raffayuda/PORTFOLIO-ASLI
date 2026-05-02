import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';

/**
 * PATCH /api/comments/react
 * Add a reaction to a comment
 */
export const PATCH: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const { commentId, emoji } = body;

		if (!commentId || !emoji) {
			return json({ error: 'commentId and emoji are required' }, { status: 400 });
		}

		const comment = await prisma.comment.findUnique({ where: { id: commentId } });
		if (!comment) {
			return json({ error: 'Comment not found' }, { status: 404 });
		}

		const reactions: Record<string, number> = typeof comment.reactions === 'string'
			? JSON.parse(comment.reactions)
			: (comment.reactions as Record<string, number>) || {};

		reactions[emoji] = (reactions[emoji] || 0) + 1;

		const updated = await prisma.comment.update({
			where: { id: commentId },
			data: { reactions: JSON.stringify(reactions) },
		});

		return json({
			comment: {
				...updated,
				reactions,
			},
		});
	} catch (error) {
		console.error('PATCH /api/comments/react error:', error);
		return json({ error: 'Failed to add reaction' }, { status: 500 });
	}
};
