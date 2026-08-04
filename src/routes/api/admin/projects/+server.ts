import { json, type RequestHandler } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { requireAdmin } from '$lib/server/auth';
import { serializeProject, projectToData, type Project } from '$lib/types';

function slugify(text: string): string {
	return (
		text
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)/g, '') || 'project'
	);
}

/**
 * GET /api/admin/projects
 * Fetch ALL projects (including unpublished) - admin only
 */
export const GET: RequestHandler = async ({ cookies }) => {
	requireAdmin(cookies);
	try {
		const rows = await prisma.project.findMany({
			orderBy: [{ year: 'desc' }, { sortOrder: 'asc' }, { createdAt: 'desc' }]
		});
		return json({ projects: rows.map(serializeProject) });
	} catch (error) {
		console.error('GET /api/admin/projects error:', error);
		return json({ error: 'Failed to fetch projects', projects: [] }, { status: 500 });
	}
};

/**
 * POST /api/admin/projects
 * Create a new project - admin only
 * Body: full Project shape (without id)
 */
export const POST: RequestHandler = async ({ request, cookies }) => {
	requireAdmin(cookies);
	try {
		const body = (await request.json()) as Project;

		if (!body.title?.en || !body.title?.id) {
			return json({ error: 'Title (id & en) is required' }, { status: 400 });
		}

		const slug = slugify(body.slug || body.title.en || 'project');
		const existing = await prisma.project.findUnique({ where: { slug } });
		if (existing) {
			return json({ error: `Slug "${slug}" already exists` }, { status: 409 });
		}

		const created = await prisma.project.create({
			data: projectToData({ ...body, slug })
		});

		return json({ project: serializeProject(created) }, { status: 201 });
	} catch (error) {
		console.error('POST /api/admin/projects error:', error);
		return json({ error: 'Failed to create project' }, { status: 500 });
	}
};
