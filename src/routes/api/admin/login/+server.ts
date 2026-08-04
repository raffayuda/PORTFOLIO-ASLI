import { json, type RequestHandler } from '@sveltejs/kit';
import { verifyAdminCredentials, setSessionCookie } from '$lib/server/auth';

/**
 * POST /api/admin/login
 * Body: { username, password }
 */
export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const body = await request.json();
		const username = typeof body.username === 'string' ? body.username.trim() : '';
		const password = typeof body.password === 'string' ? body.password : '';

		if (!username || !password) {
			return json({ error: 'Username and password are required' }, { status: 400 });
		}

		if (!(await verifyAdminCredentials(username, password))) {
			return json({ error: 'Invalid username or password' }, { status: 401 });
		}

		setSessionCookie(cookies, username);
		return json({ success: true, username });
	} catch (error) {
		console.error('POST /api/admin/login error:', error);
		return json({ error: 'Login failed' }, { status: 500 });
	}
};
