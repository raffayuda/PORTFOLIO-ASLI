import { json, type RequestHandler } from '@sveltejs/kit';
import { personalInfo } from '$lib/data/portfolio';

const GITHUB_API = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

/**
 * GET /api/github/repos
 * Fetch user repositories
 */
export const GET: RequestHandler = async ({ url }) => {
	try {
		const username = url.searchParams.get('username') || personalInfo.github;
		const sort = url.searchParams.get('sort') || 'pushed';
		const perPage = url.searchParams.get('per_page') || '12';

		const headers: Record<string, string> = {
			Accept: 'application/vnd.github.v3+json',
			'User-Agent': 'Portfolio-Website'
		};

		if (GITHUB_TOKEN) {
			headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
		}

		const response = await fetch(
			`${GITHUB_API}/users/${username}/repos?sort=${sort}&per_page=${perPage}&type=public`,
			{ headers }
		);

		if (!response.ok) {
			return json(
				{ error: `GitHub API Error: ${response.status}`, repos: [] },
				{ status: response.status }
			);
		}

		const repos = await response.json();

		// Set cache headers (5 minutes)
		return new Response(JSON.stringify({ repos }), {
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'public, max-age=300'
			}
		});
	} catch (error) {
		console.error('API Error:', error);
		return json({ error: 'Failed to fetch repositories', repos: [] }, { status: 500 });
	}
};
