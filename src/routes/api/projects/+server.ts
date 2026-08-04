import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { serializeProject } from '$lib/types';

/**
 * GET /api/projects
 * Fetch all published projects, newest first
 */
export const GET: RequestHandler = async ({ url }) => {
	try {
		const category = url.searchParams.get('category');

		const where = {
			published: true,
			...(category && category !== 'all' ? { category } : {})
		};

		const rows = await prisma.project.findMany({
			where,
			orderBy: [{ year: 'desc' }, { sortOrder: 'asc' }, { createdAt: 'desc' }]
		});

		const projects = rows.map(serializeProject);

		return new Response(JSON.stringify({ projects }), {
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'public, max-age=60'
			}
		});
	} catch (error) {
		console.error('GET /api/projects error:', error);
		return json({ error: 'Failed to fetch projects', projects: [] }, { status: 500 });
	}
};
