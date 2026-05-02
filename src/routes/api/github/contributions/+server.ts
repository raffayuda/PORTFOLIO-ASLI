import { json, type RequestHandler } from '@sveltejs/kit';
import { personalInfo } from '$lib/data/portfolio';

const CONTRIBUTIONS_API = 'https://github-contributions-api.jogruber.de/v4';

/**
 * GET /api/github/contributions
 * Fetch contribution data for last year
 */
export const GET: RequestHandler = async ({ url }) => {
	try {
		const username = url.searchParams.get('username') || personalInfo.github;
		const year = url.searchParams.get('year') || 'last';

		const response = await fetch(`${CONTRIBUTIONS_API}/${username}?y=${year}`);

		if (!response.ok) {
			return json({ error: 'Failed to fetch contributions' }, { status: response.status });
		}

		const data = await response.json();
		const days = Array.isArray(data?.contributions) ? data.contributions : [];
		const weeks: Array<typeof days> = [];
		for (let i = 0; i < days.length; i += 7) {
			weeks.push(days.slice(i, i + 7));
		}
		const contributions = { ...data, contributions: weeks };

		return new Response(JSON.stringify({ contributions }), {
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
			}
		});
	} catch (error) {
		console.error('API Error:', error);
		return json({ error: 'Failed to fetch contributions' }, { status: 500 });
	}
};
