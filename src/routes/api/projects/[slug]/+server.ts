import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { serializeProject } from '$lib/types';

/**
 * GET /api/projects/[slug]
 * Fetch a single published project by slug
 */
export const GET: RequestHandler = async ({ params }) => {
	try {
		const row = await prisma.project.findFirst({
			where: { slug: params.slug, published: true }
		});

		if (!row) {
			return json({ error: 'Project not found', project: null }, { status: 404 });
		}

		return new Response(JSON.stringify({ project: serializeProject(row) }), {
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'public, max-age=60'
			}
		});
	} catch (error) {
		console.error('GET /api/projects/[slug] error:', error);
		return json({ error: 'Failed to fetch project', project: null }, { status: 500 });
	}
};
