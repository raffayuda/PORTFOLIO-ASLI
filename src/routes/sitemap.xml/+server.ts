import { SITE_URL } from '$lib/config';
import { projects as staticProjects } from '$lib/data/portfolio';

/**
 * GET /sitemap.xml
 * Dynamic sitemap: semua halaman statis + semua project (dari DB, fallback ke portfolio.ts)
 */
export const GET = async () => {
	const staticRoutes = [
		{ path: '/', priority: '1.0', changefreq: 'monthly' },
		{ path: '/about', priority: '0.7', changefreq: 'monthly' },
		{ path: '/skills', priority: '0.8', changefreq: 'monthly' },
		{ path: '/projects', priority: '0.9', changefreq: 'weekly' },
		{ path: '/services', priority: '0.7', changefreq: 'monthly' },
		{ path: '/experience', priority: '0.6', changefreq: 'monthly' },
		{ path: '/gallery', priority: '0.5', changefreq: 'monthly' },
		{ path: '/github', priority: '0.6', changefreq: 'weekly' },
		{ path: '/music', priority: '0.4', changefreq: 'monthly' },
		{ path: '/contact', priority: '0.8', changefreq: 'yearly' }
	];

	// Ambil slug project (dari DB; fallback ke data statis bila DB tidak tersedia)
	let projectSlugs: string[] = [];
	try {
		const { prisma } = await import('$lib/prisma');
		const rows = await prisma.project.findMany({
			where: { published: true },
			select: { slug: true },
			orderBy: { year: 'desc' }
		});
		projectSlugs = rows.map((r) => r.slug);
	} catch (e) {
		projectSlugs = staticProjects.map((p) => p.slug);
	}

	const today = new Date().toISOString().slice(0, 10);

	const urls = [
		...staticRoutes.map((r) => ({
			loc: `${SITE_URL}${r.path}`,
			lastmod: today,
			changefreq: r.changefreq,
			priority: r.priority
		})),
		...projectSlugs.map((slug) => ({
			loc: `${SITE_URL}/projects/${slug}`,
			lastmod: today,
			changefreq: 'monthly',
			priority: '0.7'
		}))
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
