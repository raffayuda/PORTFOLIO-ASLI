import { json, type RequestHandler } from '@sveltejs/kit';
import { clearSessionCookie } from '$lib/server/auth';

/**
 * POST /api/admin/logout
 * Clears the admin session cookie
 */
export const POST: RequestHandler = async ({ cookies }) => {
	clearSessionCookie(cookies);
	return json({ success: true });
};
