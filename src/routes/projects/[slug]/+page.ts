import type { PageLoad } from './$types';
import { projects } from '$lib/data/portfolio';

export const load: PageLoad = ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);

    if (!project) {
        return { project: null, prevProject: null, nextProject: null };
    }

    const index = projects.indexOf(project);
    const prevProject = index > 0 ? projects[index - 1] : null;
    const nextProject = index < projects.length - 1 ? projects[index + 1] : null;

    return { project, prevProject, nextProject };
};
