import type { PageLoad } from './$types';
import { projects as staticProjects } from '$lib/data/portfolio';
import { staticProjectToProject, type Project } from '$lib/types';

export const load: PageLoad = async ({ params, fetch }) => {
	try {
		const [projectRes, listRes] = await Promise.all([
			fetch(`/api/projects/${params.slug}`),
			fetch('/api/projects')
		]);
		const projectData = await projectRes.json();
		const listData = await listRes.json();

		const project: Project | null = projectData.project || null;
		const list: Project[] = listData.projects || [];

		// Fallback ke data statis jika API tidak mengembalikan data
		const fallbackList = staticProjects.map(staticProjectToProject);
		const resolvedList = list.length > 0 ? list : fallbackList;
		const resolvedProject = project || fallbackList.find((p) => p.slug === params.slug) || null;

		const index = resolvedProject ? resolvedList.findIndex((p) => p.slug === resolvedProject.slug) : -1;

		return {
			project: resolvedProject,
			prevProject: index > 0 ? resolvedList[index - 1] : null,
			nextProject: index >= 0 && index < resolvedList.length - 1 ? resolvedList[index + 1] : null
		};
	} catch (e) {
		return { project: null, prevProject: null, nextProject: null };
	}
};
