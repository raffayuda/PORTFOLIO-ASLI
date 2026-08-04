import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { requireAdmin } from '$lib/server/auth';

/**
 * GET /api/admin/comments
 * List all comments (optionally filtered by contextKey) - admin only
 */
export const GET: RequestHandler = async ({ url, cookies }) => {
	try {
		requireAdmin(cookies);

		const contextKey = url.searchParams.get('contextKey');
		const where = contextKey ? { contextKey } : {};

		const comments = await prisma.comment.findMany({
			where,
			orderBy: { createdAt: 'desc' }
		});

		const parsed = comments.map((c) => ({
			...c,
			reactions: typeof c.reactions === 'string' ? JSON.parse(c.reactions) : c.reactions
		}));

		return json({ comments: parsed });
	} catch (error) {
		console.error('GET /api/admin/comments error:', error);
		return json({ error: 'Failed to fetch comments', comments: [] }, { status: 500 });
	}
};
