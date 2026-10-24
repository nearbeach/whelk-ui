// composables/isNavigationKey.ts
const NAVIGATION_KEYS = ['Tab', 'Shift', 'Control', 'Alt', 'Meta'];

// Keys that only move focus or hold a modifier. Validating on them flags a field
// as invalid the moment someone tabs into it.
export function isNavigationKey(event: KeyboardEvent): boolean {
	return NAVIGATION_KEYS.includes(event.key);
}
