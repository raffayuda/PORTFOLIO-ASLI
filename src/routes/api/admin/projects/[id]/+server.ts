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
 * PATCH /api/admin/projects/[id]
 * Update an existing project - admin only
 * Body: full Project shape (id is ignored, uses params.id)
 */
export const PATCH: RequestHandler = async ({ params, request, cookies }) => {
	requireAdmin(cookies);
	try {
		const existing = await prisma.project.findUnique({ where: { id: params.id } });
		if (!existing) {
			return json({ error: 'Project not found' }, { status: 404 });
		}

		const body = (await request.json()) as Project;
		const { id: _ignored, ...rest } = body;

		const slug = slugify(rest.slug || existing.slug || 'project');
		const duplicate = await prisma.project.findFirst({
			where: { slug, id: { not: params.id } }
		});
		if (duplicate) {
			return json({ error: `Slug "${slug}" already used by another project` }, { status: 409 });
		}

		const updated = await prisma.project.update({
			where: { id: params.id },
			data: projectToData({ ...rest, slug })
		});

		return json({ project: serializeProject(updated) });
	} catch (error) {
		console.error('PATCH /api/admin/projects/[id] error:', error);
		return json({ error: 'Failed to update project' }, { status: 500 });
	}
};

/**
 * DELETE /api/admin/projects/[id]
 * Delete a project - admin only
 */
export const DELETE: RequestHandler = async ({ params, cookies }) => {
	requireAdmin(cookies);
	try {
		const existing = await prisma.project.findUnique({ where: { id: params.id } });
		if (!existing) {
			return json({ error: 'Project not found' }, { status: 404 });
		}

		// Remove related comments for this project
		await prisma.comment.deleteMany({
			where: { contextKey: `project-${existing.slug}` }
		});
		await prisma.project.delete({ where: { id: params.id } });

		return json({ success: true });
	} catch (error) {
		console.error('DELETE /api/admin/projects/[id] error:', error);
		return json({ error: 'Failed to delete project' }, { status: 500 });
	}
};
