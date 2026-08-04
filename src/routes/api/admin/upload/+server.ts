import { json, type RequestHandler } from '@sveltejs/kit';
import { requireAdmin } from '$lib/server/auth';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';

const UPLOAD_DIR = join(process.cwd(), 'static', 'uploads');
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const EXT_BY_MIME: Record<string, string> = {
	'image/png': 'png',
	'image/jpeg': 'jpg',
	'image/webp': 'webp',
	'image/gif': 'gif',
	'image/avif': 'avif',
	'image/svg+xml': 'svg'
};

/**
 * POST /api/admin/upload
 * Upload a gambar (multipart/form-data, field "file") - admin only.
 * Menyimpan ke static/uploads dan mengembalikan URL publik.
 */
export const POST: RequestHandler = async ({ request, cookies }) => {
	requireAdmin(cookies);
	try {
		const form = await request.formData();
		const file = form.get('file');

		if (!file || typeof (file as File).arrayBuffer !== 'function') {
			return json({ error: 'File tidak ditemukan' }, { status: 400 });
		}

		const f = file as File;
		if (!(f.type in EXT_BY_MIME)) {
			return json({ error: 'Tipe file tidak didukung (png, jpg, webp, gif, avif, svg)' }, { status: 400 });
		}
		if (f.size > MAX_SIZE) {
			return json({ error: 'Ukuran file maksimal 5MB' }, { status: 400 });
		}

		const ext = EXT_BY_MIME[f.type];
		const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;

		mkdirSync(UPLOAD_DIR, { recursive: true });
		writeFileSync(join(UPLOAD_DIR, filename), Buffer.from(await f.arrayBuffer()));

		return json({ url: `/uploads/${filename}` });
	} catch (error) {
		console.error('POST /api/admin/upload error:', error);
		return json({ error: 'Upload gagal' }, { status: 500 });
	}
};
