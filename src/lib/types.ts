/**
 * Shared types for dynamic (DB-backed) portfolio projects
 */

export interface BilingualText {
	id: string;
	en: string;
}

export interface BilingualList {
	id: string[];
	en: string[];
}

export interface Project {
	id: string;
	slug: string;
	title: BilingualText;
	description: BilingualText;
	longDescription: BilingualText;
	image: string;
	gallery: string[];
	tags: string[];
	github: string | null;
	demo: string | null;
	category: string;
	features: BilingualList;
	year: number;
	published: boolean;
}

/** Raw row shape returned by Prisma for the Project model */
export interface ProjectRow {
	id: string;
	slug: string;
	titleId: string;
	titleEn: string;
	descriptionId: string;
	descriptionEn: string;
	longDescriptionId: string;
	longDescriptionEn: string;
	image: string;
	gallery: unknown;
	tags: unknown;
	github: string | null;
	demo: string | null;
	category: string;
	featuresId: unknown;
	featuresEn: unknown;
	year: number;
	published: boolean;
	sortOrder: number;
	createdAt: Date;
	updatedAt: Date;
}

/** Safely parse a Prisma Json field that may come back as a string or parsed value */
export function parseJson<T>(value: unknown, fallback: T): T {
	if (value === null || value === undefined) return fallback;
	if (typeof value === 'string') {
		try {
			return JSON.parse(value) as T;
		} catch {
			return fallback;
		}
	}
	return value as T;
}

/** Convert a DB row into the UI-facing Project shape */
export function serializeProject(row: ProjectRow): Project {
	return {
		id: row.id,
		slug: row.slug,
		title: { id: row.titleId, en: row.titleEn },
		description: { id: row.descriptionId, en: row.descriptionEn },
		longDescription: { id: row.longDescriptionId, en: row.longDescriptionEn },
		image: row.image,
		gallery: parseJson<string[]>(row.gallery, []),
		tags: parseJson<string[]>(row.tags, []),
		github: row.github,
		demo: row.demo,
		category: row.category,
		features: {
			id: parseJson<string[]>(row.featuresId, []),
			en: parseJson<string[]>(row.featuresEn, [])
		},
		year: row.year,
		published: row.published
	};
}

/** Convert a static portfolio.ts project entry into the UI-facing Project shape */
export function staticProjectToProject(p: {
	id: number | string;
	slug: string;
	title: BilingualText;
	description: BilingualText;
	longDescription?: BilingualText;
	image: string;
	gallery?: string[];
	tags?: string[];
	github?: string | null;
	demo?: string | null;
	category: string;
	features?: BilingualList;
	year: number;
}): Project {
	return {
		id: String(p.id),
		slug: p.slug,
		title: p.title,
		description: p.description,
		longDescription: p.longDescription || { id: '', en: '' },
		image: p.image,
		gallery: p.gallery || [],
		tags: p.tags || [],
		github: p.github || null,
		demo: p.demo || null,
		category: p.category,
		features: p.features || { id: [], en: [] },
		year: p.year,
		published: true
	};
}

/** Convert a UI-facing Project back into a Prisma create/update payload */
export function projectToData(project: Omit<Project, 'id'>) {
	return {
		slug: project.slug,
		titleId: project.title.id,
		titleEn: project.title.en,
		descriptionId: project.description.id,
		descriptionEn: project.description.en,
		longDescriptionId: project.longDescription.id,
		longDescriptionEn: project.longDescription.en,
		image: project.image,
		gallery: project.gallery ?? [],
		tags: project.tags ?? [],
		github: project.github || null,
		demo: project.demo || null,
		category: project.category,
		featuresId: project.features?.id ?? [],
		featuresEn: project.features?.en ?? [],
		year: project.year,
		published: project.published ?? true
	};
}
