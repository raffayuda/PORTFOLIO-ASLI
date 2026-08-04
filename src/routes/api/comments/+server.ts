import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { requireAdmin } from '$lib/server/auth';

/**
 * GET /api/comments?contextKey=xxx
 * Fetch comments for a specific context (repo, project, etc.)
 */
export const GET: RequestHandler = async ({ url }) => {
	try {
		const contextKey = url.searchParams.get('contextKey');
		if (!contextKey) {
			return json({ error: 'contextKey is required' }, { status: 400 });
		}

		const comments = await prisma.comment.findMany({
			where: { contextKey },
			orderBy: { createdAt: 'desc' },
		});

		// Parse reactions from JSON string
		const parsed = comments.map(c => ({
			...c,
			reactions: typeof c.reactions === 'string' ? JSON.parse(c.reactions) : c.reactions,
		}));

		return json({ comments: parsed });
	} catch (error) {
		console.error('GET /api/comments error:', error);
		return json({ error: 'Failed to fetch comments' }, { status: 500 });
	}
};

/**
 * POST /api/comments
 * Create a new comment
 */
export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const { contextKey, name, message } = body;

		if (!contextKey || !message?.trim()) {
			return json({ error: 'contextKey and message are required' }, { status: 400 });
		}

		const comment = await prisma.comment.create({
			data: {
				contextKey,
				name: name?.trim() || 'Anonymous',
				message: message.trim(),
				reactions: '{}',
			},
		});

		return json({
			comment: {
				...comment,
				reactions: {},
			},
		}, { status: 201 });
	} catch (error) {
		console.error('POST /api/comments error:', error);
		return json({ error: 'Failed to create comment' }, { status: 500 });
	}
};

/**
 * DELETE /api/comments?id=xxx
 * Delete a comment by ID (admin only)
 */
export const DELETE: RequestHandler = async ({ url, cookies }) => {
	requireAdmin(cookies);
	try {
		const id = url.searchParams.get('id');
		if (!id) {
			return json({ error: 'id is required' }, { status: 400 });
		}

		await prisma.comment.delete({ where: { id } });
		return json({ success: true });
	} catch (error) {
		console.error('DELETE /api/comments error:', error);
		return json({ error: 'Failed to delete comment' }, { status: 500 });
	}
};
