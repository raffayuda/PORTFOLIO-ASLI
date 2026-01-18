import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

// Get initial theme from localStorage or system preference
function getInitialTheme(): Theme {
    if (!browser) return 'dark';

    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored) return stored;

    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }

    return 'light';
}

function createThemeStore() {
    const { subscribe, set, update } = writable<Theme>(getInitialTheme());

    return {
        subscribe,
        toggle: () => {
            update(current => {
                const newTheme = current === 'dark' ? 'light' : 'dark';

                if (browser) {
                    localStorage.setItem('theme', newTheme);

                    // Update document class
                    if (newTheme === 'dark') {
                        document.documentElement.classList.add('dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                    }
                }

                return newTheme;
            });
        },
        set: (theme: Theme) => {
            if (browser) {
                localStorage.setItem('theme', theme);

                // Update document class
                if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }
            set(theme);
        },
        init: () => {
            if (browser) {
                const theme = getInitialTheme();
                if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                }
            }
        }
    };
}

export const theme = createThemeStore();
