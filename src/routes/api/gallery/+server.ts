import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { requireAdmin } from '$lib/server/auth';

/**
 * GET /api/gallery?type=certificate|documentation
 * Fetch gallery items, optionally filtered by type
 */
export const GET: RequestHandler = async ({ url }) => {
	try {
		const type = url.searchParams.get('type');
		
		const where = type ? { type } : {};
		
		const items = await prisma.galleryItem.findMany({
			where,
			orderBy: [
				{ sortOrder: 'asc' },
				{ createdAt: 'desc' },
			],
		});

		return json({ items });
	} catch (error) {
		console.error('GET /api/gallery error:', error);
		return json({ error: 'Failed to fetch gallery items', items: [] }, { status: 500 });
	}
};

/**
 * POST /api/gallery
 * Create a new gallery item (admin only)
 */
export const POST: RequestHandler = async ({ request, cookies }) => {
	requireAdmin(cookies);
	try {
		const body = await request.json();
		const { type, titleId, titleEn, descId, descEn, issuer, date, imageUrl, sortOrder } = body;

		if (!type || !titleId || !titleEn || !date || !imageUrl) {
			return json({ error: 'Missing required fields' }, { status: 400 });
		}

		const item = await prisma.galleryItem.create({
			data: {
				type,
				titleId,
				titleEn,
				descId: descId || '',
				descEn: descEn || '',
				issuer: issuer || null,
				date,
				imageUrl,
				sortOrder: sortOrder || 0,
			},
		});

		return json({ item }, { status: 201 });
	} catch (error) {
		console.error('POST /api/gallery error:', error);
		return json({ error: 'Failed to create gallery item' }, { status: 500 });
	}
};

/**
 * PATCH /api/gallery?id=xxx
 * Update an existing gallery item (admin only)
 */
export const PATCH: RequestHandler = async ({ url, request, cookies }) => {
	requireAdmin(cookies);
	try {
		const id = url.searchParams.get('id');
		if (!id) {
			return json({ error: 'id is required' }, { status: 400 });
		}

		const existing = await prisma.galleryItem.findUnique({ where: { id } });
		if (!existing) {
			return json({ error: 'Gallery item not found' }, { status: 404 });
		}

		const body = await request.json();
		const { type, titleId, titleEn, descId, descEn, issuer, date, imageUrl, sortOrder } = body;

		const item = await prisma.galleryItem.update({
			where: { id },
			data: {
				type: type || existing.type,
				titleId: titleId ?? existing.titleId,
				titleEn: titleEn ?? existing.titleEn,
				descId: descId ?? existing.descId,
				descEn: descEn ?? existing.descEn,
				issuer: issuer === undefined ? existing.issuer : issuer || null,
				date: date || existing.date,
				imageUrl: imageUrl || existing.imageUrl,
				sortOrder: sortOrder ?? existing.sortOrder,
			},
		});

		return json({ item });
	} catch (error) {
		console.error('PATCH /api/gallery error:', error);
		return json({ error: 'Failed to update gallery item' }, { status: 500 });
	}
};

/**
 * DELETE /api/gallery?id=xxx
 * Delete a gallery item (admin only)
 */
export const DELETE: RequestHandler = async ({ url, cookies }) => {
	requireAdmin(cookies);
	try {
		const id = url.searchParams.get('id');
		if (!id) {
			return json({ error: 'id is required' }, { status: 400 });
		}

		await prisma.galleryItem.delete({ where: { id } });
		return json({ success: true });
	} catch (error) {
		console.error('DELETE /api/gallery error:', error);
		return json({ error: 'Failed to delete gallery item' }, { status: 500 });
	}
};
