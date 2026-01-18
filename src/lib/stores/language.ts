import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Language = 'id' | 'en';

// Get saved language from localStorage or default to 'id' (Indonesian)
const getInitialLanguage = (): Language => {
    if (browser) {
        const saved = localStorage.getItem('language');
        if (saved === 'id' || saved === 'en') {
            return saved;
        }
    }
    return 'id';
};

// Create the store
function createLanguageStore() {
    const { subscribe, set, update } = writable<Language>(getInitialLanguage());

    return {
        subscribe,
        setLanguage: (lang: Language) => {
            set(lang);
            if (browser) {
                localStorage.setItem('language', lang);
            }
        },
        toggle: () => {
            update(current => {
                const newLang = current === 'id' ? 'en' : 'id';
                if (browser) {
                    localStorage.setItem('language', newLang);
                }
                return newLang;
            });
        }
    };
}

export const language = createLanguageStore();
