import { redirect } from '@sveltejs/kit';
import { getUserFromCookies } from '$lib/server/auth';

export const load = async ({ cookies }) => {
	const username = getUserFromCookies(cookies);
	if (!username) {
		throw redirect(302, '/admin/login');
	}
	return { username };
};
