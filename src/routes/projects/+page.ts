import type { PageLoad } from './$types';
import { projects as staticProjects } from '$lib/data/portfolio';
import { staticProjectToProject, type Project } from '$lib/types';

export const load: PageLoad = async ({ fetch }) => {
	// Prefer dynamic data from the DB-backed API
	try {
		const res = await fetch('/api/projects');
		if (res.ok) {
			const data = await res.json();
			if (Array.isArray(data.projects) && data.projects.length > 0) {
				return { projects: data.projects as Project[] };
			}
		}
	} catch (e) {
		// fall through to static fallback
	}

	// Fallback: data statis dari portfolio.ts agar tidak pernah kosong
	return { projects: staticProjects.map(staticProjectToProject) };
};
