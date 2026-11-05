import {describe, expect, it} from 'vitest'
import {readdirSync, readFileSync, statSync} from 'node:fs'
import {join} from 'node:path'

// Guards the theming contract documented in docs/theming.md.
const SRC = join(__dirname, '..')

const walk = (dir: string): string[] =>
	readdirSync(dir).flatMap((name) => {
		const full = join(dir, name)
		if (statSync(full).isDirectory()) return walk(full)
		return /\.(vue|css)$/.test(name) ? [full] : []
	})

const files = walk(SRC)
const styleFiles = files.filter((f) => f.includes('/styles/'))
const read = (f: string) => readFileSync(f, 'utf8')

// Every custom property declared anywhere in the shared styles
const defined = new Set<string>()
for (const f of styleFiles) {
	for (const m of read(f).matchAll(/^\s*(--wlk-[a-z0-9-]+)\s*:/gm)) defined.add(m[1])
}

describe('theming tokens', () => {
	it('declares tokens at all', () => {
		expect(defined.has('--wlk-r')).toBe(true)
		expect(defined.has('--wlk-bw')).toBe(true)
		expect(defined.has('--wlk-bs')).toBe(true)
		expect(defined.has('--wlk-bg-surface')).toBe(true)
	})

	it('defines every token that is used without a fallback', () => {
		const missing: string[] = []
		for (const f of files) {
			// var(--wlk-name) with no fallback value
			for (const m of read(f).matchAll(/var\(\s*(--wlk-[a-z0-9-]+)\s*\)/g)) {
				if (!defined.has(m[1])) missing.push(`${f.replace(SRC, 'src')}: ${m[1]}`)
			}
		}
		expect(missing).toEqual([])
	})

	it('no longer uses the old long-form token names', () => {
		const legacy = /--wlk-(border-(radius|width|style|top|right|bottom|left)|card-footer-|checkbox-|tab-button-)/
		const offenders = files
			.filter((f) => !f.endsWith('.test.ts'))
			.filter((f) => legacy.test(read(f)))
			.map((f) => f.replace(SRC, 'src'))
		expect(offenders).toEqual([])
	})

	it('leaves per-corner and per-side tokens undefined so wrapper overrides work', () => {
		const derived = [...defined].filter((n) => /^--wlk-(r|bw|bs)-(tl|tr|br|bl|t|r|b|l)$/.test(n))
		expect(derived).toEqual([])
	})

	it('resolves component border radii through the --wlk-r chain', () => {
		const offenders: string[] = []
		for (const f of files.filter((f) => f.endsWith('.vue'))) {
			for (const m of read(f).matchAll(/border-radius:\s*([^;]+);/g)) {
				const value = m[1].trim()
				if (!value.includes('--wlk-r') && !/^(0|none|inherit)$/.test(value)) {
					offenders.push(`${f.replace(SRC, 'src')}: ${value}`)
				}
			}
		}
		expect(offenders).toEqual([])
	})

	it('has a dark theme that only remaps the palette, not the semantic tokens', () => {
		const dark = read(join(SRC, 'styles/variables/_dark_colour_variables.css'))
		expect(dark).not.toMatch(/--wlk-(bg|text|r|bw|bs)-/)
	})
})
