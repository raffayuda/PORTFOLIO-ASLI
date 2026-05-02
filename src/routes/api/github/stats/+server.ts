import { json, type RequestHandler } from '@sveltejs/kit';
import { personalInfo } from '$lib/data/portfolio';

const GITHUB_API = 'https://api.github.com';
const CONTRIBUTIONS_API = 'https://github-contributions-api.jogruber.de/v4';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

/**
 * GET /api/github/stats
 * Fetch user stats (repos count, followers, etc)
 */
export const GET: RequestHandler = async ({ url }) => {
	try {
		const username = url.searchParams.get('username') || personalInfo.github;

		const headers: Record<string, string> = {
			Accept: 'application/vnd.github.v3+json',
			'User-Agent': 'Portfolio-Website'
		};

		if (GITHUB_TOKEN) {
			headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
		}

		const response = await fetch(`${GITHUB_API}/users/${username}`, { headers });

		if (!response.ok) {
			return json({ error: 'Failed to fetch stats' }, { status: response.status });
		}

		const stats = await response.json();

		// Return only needed fields
		const userData = {
			login: stats.login,
			avatar_url: stats.avatar_url,
			bio: stats.bio,
			public_repos: stats.public_repos,
			followers: stats.followers,
			following: stats.following,
			created_at: stats.created_at,
			updated_at: stats.updated_at
		};

		return new Response(JSON.stringify({ stats: userData }), {
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'public, max-age=600'
			}
		});
	} catch (error) {
		console.error('API Error:', error);
		return json({ error: 'Failed to fetch stats', stats: null }, { status: 500 });
	}
};
