import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { env } from '$env/dynamic/private';
import { error, type Cookies } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const SESSION_COOKIE = 'admin_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

// ── Password hashing (scrypt) ──────────────────────────────
export function hashPassword(password: string): string {
	const salt = randomBytes(16).toString('hex');
	const hash = scryptSync(password, salt, 64).toString('hex');
	return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
	const [salt, hash] = stored.split(':');
	if (!salt || !hash) return false;
	const testHash = scryptSync(password, salt, 64).toString('hex');
	return timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(testHash, 'hex'));
}

// ── Credential verification against DB ─────────────────────
export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
	if (!username || !password) return false;
	const admin = await prisma.admin.findUnique({ where: { username } });
	if (!admin) return false;
	return verifyPassword(password, admin.passwordHash);
}

/**
 * Update the logged-in admin's username and/or password.
 * Requires the current password to be correct.
 */
export async function updateAdminCredentials(
	currentUsername: string,
	opts: { currentPassword: string; newUsername?: string; newPassword?: string }
): Promise<{ ok: true; username: string } | { ok: false; error: string }> {
	const admin = await prisma.admin.findUnique({ where: { username: currentUsername } });
	if (!admin) return { ok: false, error: 'Admin tidak ditemukan' };
	if (!verifyPassword(opts.currentPassword, admin.passwordHash)) {
		return { ok: false, error: 'Password saat ini salah' };
	}

	const data: { username?: string; passwordHash?: string } = {};

	if (opts.newUsername && opts.newUsername.trim() && opts.newUsername.trim() !== admin.username) {
		const newUsername = opts.newUsername.trim();
		const exists = await prisma.admin.findUnique({ where: { username: newUsername } });
		if (exists) return { ok: false, error: 'Username sudah digunakan' };
		data.username = newUsername;
	}

	if (opts.newPassword) {
		if (opts.newPassword.length < 6) return { ok: false, error: 'Password minimal 6 karakter' };
		data.passwordHash = hashPassword(opts.newPassword);
	}

	if (Object.keys(data).length === 0) {
		return { ok: false, error: 'Tidak ada perubahan yang dilakukan' };
	}

	await prisma.admin.update({ where: { id: admin.id }, data });
	return { ok: true, username: data.username || admin.username };
}

// ── Session (HMAC-signed cookie) ───────────────────────────
function getSecret(): string {
	const secret = env.SESSION_SECRET;
	if (!secret) {
		throw new Error('SESSION_SECRET environment variable is not set');
	}
	return secret;
}

function sign(payload: string): string {
	const sig = createHmac('sha256', getSecret()).update(payload).digest('base64url');
	return `${payload}.${sig}`;
}

function verify(token: string): string | null {
	const [payload, sig] = token.split('.');
	if (!payload || !sig) return null;

	const expected = createHmac('sha256', getSecret()).update(payload).digest('base64url');
	const a = Buffer.from(sig);
	const b = Buffer.from(expected);
	if (a.length !== b.length) return null;
	if (!timingSafeEqual(a, b)) return null;

	try {
		const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
		if (typeof data.username === 'string' && typeof data.exp === 'number' && data.exp > Date.now()) {
			return data.username;
		}
	} catch {
		// malformed payload
	}
	return null;
}

export function createSession(username: string): string {
	const payload = Buffer.from(
		JSON.stringify({ username, exp: Date.now() + SESSION_TTL_MS })
	).toString('base64url');
	return sign(payload);
}

export function setSessionCookie(cookies: Cookies, username: string): void {
	cookies.set(SESSION_COOKIE, createSession(username), {
		httpOnly: true,
		sameSite: 'lax',
		path: '/',
		maxAge: SESSION_TTL_MS / 1000,
		secure: process.env.NODE_ENV === 'production'
	});
}

export function clearSessionCookie(cookies: Cookies): void {
	cookies.delete(SESSION_COOKIE, { path: '/' });
}

export function getUserFromCookies(cookies: Cookies): string | null {
	const token = cookies.get(SESSION_COOKIE);
	if (!token) return null;
	return verify(token);
}

/** Throws 401 if the request is not authenticated, otherwise returns the admin username */
export function requireAdmin(cookies: Cookies): string {
	const username = getUserFromCookies(cookies);
	if (!username) {
		throw error(401, 'Unauthorized');
	}
	return username;
}
