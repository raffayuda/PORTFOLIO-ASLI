/**
 * GitHub API Utilities
 * Fetch repositories, contributions, and user stats
 */

export interface Repository {
	id: number;
	name: string;
	description: string | null;
	url: string;
	homepage: string | null;
	language: string | null;
	stargazers_count: number;
	forks_count: number;
	watchers_count: number;
	pushed_at: string;
	created_at: string;
	updated_at: string;
	topics: string[];
}

export interface UserStats {
	public_repos: number;
	followers: number;
	following: number;
	created_at: string;
}

export interface ContributionData {
	total: {
		lastYear: number;
		lastMonth: number;
	};
	contributions: number[][];
}

const GITHUB_API = 'https://api.github.com';
const CONTRIBUTIONS_API = 'https://github-contributions-api.jogruber.de/v4';

// Optional: Add your GitHub token for higher rate limits
// Get token from: https://github.com/settings/tokens (Personal access tokens)
// Create .env.local with: VITE_GITHUB_TOKEN=your_token_here
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || '';

/**
 * Fetch user repositories
 * Limit: 60 requests/hour (unauthenticated) or 5000/hour (authenticated)
 */
export async function getRepositories(
	username: string,
	options: {
		sort?: 'stars' | 'forks' | 'updated' | 'pushed';
		per_page?: number;
	} = {}
): Promise<Repository[]> {
	const { sort = 'pushed', per_page = 12 } = options;

	try {
		const headers: Record<string, string> = {
			Accept: 'application/vnd.github.v3+json'
		};

		if (GITHUB_TOKEN) {
			headers.Authorization = `token ${GITHUB_TOKEN}`;
		}

		const url = `${GITHUB_API}/users/${username}/repos?sort=${sort}&per_page=${per_page}&type=public`;
		const response = await fetch(url, { headers });

		if (!response.ok) {
			throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error fetching repositories:', error);
		return [];
	}
}

/**
 * Fetch user stats
 */
export async function getUserStats(username: string): Promise<UserStats | null> {
	try {
		const headers: Record<string, string> = {
			Accept: 'application/vnd.github.v3+json'
		};

		if (GITHUB_TOKEN) {
			headers.Authorization = `token ${GITHUB_TOKEN}`;
		}

		const response = await fetch(`${GITHUB_API}/users/${username}`, { headers });

		if (!response.ok) {
			throw new Error(`GitHub API Error: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error fetching user stats:', error);
		return null;
	}
}

/**
 * Fetch contribution data dengan retry logic
 * Uses unofficial contributions API dengan timeout & retry
 */
export async function getContributions(username: string, retries: number = 3): Promise<ContributionData | null> {
	for (let attempt = 1; attempt <= retries; attempt++) {
		try {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

			const response = await fetch(`${CONTRIBUTIONS_API}/${username}?y=last`, {
				signal: controller.signal
			});

			clearTimeout(timeoutId);

			if (!response.ok) {
				console.warn(`Contributions API attempt ${attempt}/${retries} failed: ${response.status}`);
				if (attempt < retries) {
					// Wait before retry (exponential backoff)
					await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
					continue;
				}
				throw new Error(`Contributions API Error: ${response.status}`);
			}

			const data = await response.json();
			console.log(`✓ Contributions loaded on attempt ${attempt}`);
			return data;
		} catch (error) {
			console.warn(`Contributions API attempt ${attempt}/${retries} error:`, error instanceof Error ? error.message : error);
			
			if (attempt < retries) {
				// Wait before retry
				await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
			}
		}
	}

	console.error('Failed to fetch contributions after', retries, 'attempts');
	return null;
}

/**
 * Get color intensity for contribution graph
 */
export function getContributionColor(count: number): string {
	if (count === 0) return 'var(--glass-border)';
	if (count <= 2) return 'oklch(0.685 0.169 222 / 0.3)';
	if (count <= 5) return 'oklch(0.685 0.169 222 / 0.55)';
	if (count <= 10) return 'oklch(0.685 0.169 222 / 0.75)';
	return 'oklch(0.685 0.169 222)';
}

/**
 * Get language colors for repository badges
 */
export function getLanguageColor(language: string): string {
	const colors: Record<string, string> = {
		JavaScript: '#f1e05a',
		TypeScript: '#3178c6',
		Python: '#3572A5',
		PHP: '#4F5D95',
		HTML: '#e34c26',
		CSS: '#563d7c',
		Svelte: '#ff3e00',
		Vue: '#41b883',
		React: '#61DAFB',
		'Jupyter Notebook': '#DA5B0B',
		Java: '#007396',
		'C#': '#239120',
		Go: '#00ADD8',
		Rust: '#CE422B'
	};
	return colors[language] || '#8b949e';
}

/**
 * Format date to readable string
 */
export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString('id-ID', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}

/**
 * Calculate days since date
 */
export function daysSince(dateString: string): number {
	const date = new Date(dateString);
	const now = new Date();
	const diff = now.getTime() - date.getTime();
	return Math.floor(diff / (1000 * 60 * 60 * 24));
}
