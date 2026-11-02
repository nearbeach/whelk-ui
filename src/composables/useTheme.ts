import { ref, readonly } from 'vue';

export type ThemeType = 'light' | 'dark';

const STORAGE_KEY = 'wlk-theme';

const theme = ref<ThemeType>('light');
let initialised = false;

const apply = (value: ThemeType) => {
	theme.value = value;
	if (typeof document !== 'undefined') {
		document.documentElement.setAttribute('data-theme', value);
	}
};

const readStored = (): ThemeType | null => {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored === 'light' || stored === 'dark' ? stored : null;
	} catch {
		return null;
	}
};

export const setTheme = (value: ThemeType) => {
	apply(value);
	try {
		localStorage.setItem(STORAGE_KEY, value);
	} catch {
		// Storage can be blocked (private mode); the theme still applies for this session
	}
};

/**
 * Light/dark theme toggle. The theme is never taken from the OS: it defaults to
 * light until the user switches it, and the choice is remembered in localStorage.
 */
export const useTheme = () => {
	if (!initialised) {
		initialised = true;
		apply(readStored() ?? 'light');
	}

	return {
		theme: readonly(theme),
		setTheme,
		toggleTheme: () => setTheme(theme.value === 'dark' ? 'light' : 'dark'),
	};
};
