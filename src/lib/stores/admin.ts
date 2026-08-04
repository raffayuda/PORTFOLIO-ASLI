import { writable, get } from 'svelte/store';

/**
 * Admin session state (client-side).
 * Determines whether the current visitor is logged in as admin
 * so the UI can show CRUD controls on the public pages.
 */
function createAdminStore() {
	const { subscribe, set } = writable<{ authenticated: boolean; username: string | null }>({
		authenticated: false,
		username: null
	});

	async function check(): Promise<boolean> {
		try {
			const res = await fetch('/api/admin/me');
			if (res.ok) {
				const data = await res.json();
				set({ authenticated: data.authenticated === true, username: data.username || null });
				return data.authenticated === true;
			}
		} catch (e) {
			// ignore network errors
		}
		set({ authenticated: false, username: null });
		return false;
	}

	async function logout(): Promise<void> {
		try {
			await fetch('/api/admin/logout', { method: 'POST' });
		} catch (e) {
			// ignore
		}
		set({ authenticated: false, username: null });
	}

	return {
		subscribe,
		check,
		logout,
		isAdmin: () => get({ subscribe }).authenticated
	};
}

export const admin = createAdminStore();
