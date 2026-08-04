import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { requireAdmin } from '$lib/server/auth';

/**
 * DELETE /api/admin/comments/[id]
 * Delete a comment - admin only
 */
export const DELETE: RequestHandler = async ({ params, cookies }) => {
	requireAdmin(cookies);
	try {
		const existing = await prisma.comment.findUnique({ where: { id: params.id } });
		if (!existing) {
			return json({ error: 'Comment not found' }, { status: 404 });
		}

		await prisma.comment.delete({ where: { id: params.id } });
		return json({ success: true });
	} catch (error) {
		console.error('DELETE /api/admin/comments/[id] error:', error);
		return json({ error: 'Failed to delete comment' }, { status: 500 });
	}
};
