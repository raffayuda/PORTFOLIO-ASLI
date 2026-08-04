import { json, type RequestHandler } from '@sveltejs/kit';
import { getUserFromCookies } from '$lib/server/auth';

/**
 * GET /api/admin/me
 * Returns whether the current visitor is authenticated as admin
 */
export const GET: RequestHandler = async ({ cookies }) => {
	const username = getUserFromCookies(cookies);
	if (!username) {
		return json({ authenticated: false, username: null });
	}
	return json({ authenticated: true, username });
};
