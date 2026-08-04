import { json, type RequestHandler } from '@sveltejs/kit';
import { requireAdmin, setSessionCookie, updateAdminCredentials } from '$lib/server/auth';

/**
 * GET /api/admin/account
 * Return the logged-in admin's username - admin only
 */
export const GET: RequestHandler = async ({ cookies }) => {
	try {
		const username = requireAdmin(cookies);
		return json({ username });
	} catch (error) {
		console.error('GET /api/admin/account error:', error);
		return json({ error: 'Unauthorized' }, { status: 401 });
	}
};

/**
 * PATCH /api/admin/account
 * Change username and/or password - admin only
 * Body: { currentPassword, newUsername?, newPassword? }
 */
export const PATCH: RequestHandler = async ({ request, cookies }) => {
	try {
		const currentUsername = requireAdmin(cookies);
		const body = await request.json();

		const currentPassword = typeof body.currentPassword === 'string' ? body.currentPassword : '';
		const newUsername = typeof body.newUsername === 'string' ? body.newUsername : undefined;
		const newPassword = typeof body.newPassword === 'string' ? body.newPassword : undefined;

		if (!currentPassword) {
			return json({ error: 'Password saat ini wajib diisi' }, { status: 400 });
		}

		const result = await updateAdminCredentials(currentUsername, {
			currentPassword,
			newUsername,
			newPassword
		});

		if (!result.ok) {
			return json({ error: result.error }, { status: 400 });
		}

		// If the username changed, refresh the session cookie with the new username
		if (result.username !== currentUsername) {
			setSessionCookie(cookies, result.username);
		}

		return json({ success: true, username: result.username });
	} catch (error) {
		console.error('PATCH /api/admin/account error:', error);
		return json({ error: 'Gagal memperbarui akun' }, { status: 500 });
	}
};
