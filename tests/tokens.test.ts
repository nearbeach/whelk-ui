import {describe, expect, it} from 'vitest'
import {readdirSync, readFileSync, statSync} from 'node:fs'
import {join} from 'node:path'

// Guards the theming contract documented in docs/theming.md.
// Lives outside src/ so the library's type declarations build never sees the Node imports.
const SRC = join(import.meta.dirname, '..', 'src')

const walk = (dir: string): string[] =>
	readdirSync(dir).flatMap((name) => {
		const full = join(dir, name)
		if (statSync(full).isDirectory()) return walk(full)
		return /\.(vue|css)$/.test(name) ? [full] : []
	})

const files = walk(SRC)
const styleFiles = files.filter((f) => f.endsWith('.css'))
const read = (f: string) => readFileSync(f, 'utf8')
const rel = (f: string) => f.replace(SRC, 'src')

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
				if (!defined.has(m[1])) missing.push(`${rel(f)}: ${m[1]}`)
			}
		}
		expect(missing).toEqual([])
	})

	it('no longer uses the old long-form token names', () => {
		const legacy = /--wlk-(border-(radius|width|style|top|right|bottom|left)|card-footer-|checkbox-|tab-button-)/
		const offenders = files
			.filter((f) => !f.endsWith('.test.ts'))
			.filter((f) => legacy.test(read(f)))
			.map((f) => rel(f))
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
					offenders.push(`${rel(f)}: ${value}`)
				}
			}
		}
		expect(offenders).toEqual([])
	})

	it('has a dark theme that only remaps the palette, not the semantic tokens', () => {
		const dark = read(join(SRC, 'styles/variables/_dark_colour_variables.css'))
		expect(dark).not.toMatch(/--wlk-(bg|text|r|bw|bs)-/)
	})
	it('gives the dark theme exactly the same palette tokens as the light theme', () => {
		const palette = /^\s*(--wlk-(?:red|blue|green|amber|violet|neutral)(?:-colour)?-\d+)\s*:/gm
		const names = (text: string) => [...text.matchAll(palette)].map((m) => m[1]).sort()
		const light = names(read(join(SRC, 'styles/variables/_colour_variables.css')))
		const dark = names(read(join(SRC, 'styles/variables/_dark_colour_variables.css')))
		expect(light.length).toBeGreaterThan(0)
		expect(dark).toEqual(light)
	})

	it('defines and uses all four tokens for every colour variant', () => {
		const colours = read(join(SRC, 'styles/shared/_colours.css'))
		const missing: string[] = []
		for (const v of ['primary', 'secondary', 'danger', 'warning', 'success', 'info']) {
			for (const part of ['bg', 'bg-hover', 'bg-subtle', 'border']) {
				const name = `--wlk-${v}-${part}`
				if (!defined.has(name)) missing.push(`${name} is not defined`)
				if (!colours.includes(`var(${name})`)) missing.push(`${name} is not used in _colours.css`)
			}
			// each variant class must use its own tokens, not another variant's
			const block = colours.match(new RegExp(`\\.${v} \\{[\\s\\S]*?\\n\\}`))?.[0] ?? ''
			const foreign = [...block.matchAll(/--wlk-(primary|secondary|danger|warning|success|info)-/g)]
				.map((m) => m[1])
				.filter((x) => x !== v)
			if (foreign.length) missing.push(`.${v} uses ${foreign.join(', ')} tokens`)
		}
		expect(missing).toEqual([])
	})

	it('writes radius chains with one component, in corner order, each falling back to the same corner', () => {
		const order = ['tl', 'tr', 'br', 'bl']
		const problems: string[] = []
		for (const f of files) {
			for (const m of read(f).matchAll(/border-radius:\s*([^;]+);/g)) {
				const value = m[1]
				const prefixed = [...value.matchAll(/--wlk-([a-z-]+)-r-(tl|tr|br|bl),\s*var\(--wlk-r-\2,\s*var\(--wlk-r\)\)\)/g)]
				const mentions = (value.match(/--wlk-[a-z-]+-r-(tl|tr|br|bl),/g) ?? []).length
				if (!prefixed.length) continue
				const where = `${rel(f)}: ${value.slice(0, 60)}`
				if (prefixed.length !== mentions) problems.push(`${where} has a broken chain`)
				if (new Set(prefixed.map((x) => x[1])).size > 1) problems.push(`${where} mixes components`)
				const idx = prefixed.map((x) => order.indexOf(x[2]))
				if (idx.some((n, i) => i > 0 && n <= idx[i - 1])) problems.push(`${where} has corners out of order`)
			}
		}
		expect(problems).toEqual([])
	})

	it('writes padding chains with one component and all four sides in t, r, b, l order', () => {
		const problems: string[] = []
		for (const f of files) {
			for (const m of read(f).matchAll(/padding:\s*([^;]+);/g)) {
				const value = m[1]
				const chain = [...value.matchAll(/var\(--wlk-([a-z-]+)-p-([trbl]),\s*var\(--wlk-\1-p,\s*[^)]+\)\)/g)]
				const mentions = (value.match(/--wlk-[a-z-]+-p-[trbl],/g) ?? []).length
				if (!mentions) continue
				const where = `${rel(f)}: ${value.slice(0, 60)}`
				if (chain.length !== mentions) problems.push(`${where} has a broken chain`)
				if (chain.map((x) => x[2]).join('') !== 'trbl') problems.push(`${where} is not t, r, b, l`)
				if (new Set(chain.map((x) => x[1])).size > 1) problems.push(`${where} mixes components`)
			}
		}
		expect(problems).toEqual([])
	})

	it('only documents tokens that exist', () => {
		const docs = read(join(SRC, '..', 'docs/theming.md')).split('## Renamed')[0]
		const everything = files.map(read).join('\n')
		const unknown = [...new Set(docs.match(/--wlk-[a-z0-9]+(?:-[a-z0-9]+)*/g) ?? [])]
			.filter((name) => !everything.includes(name))
		expect(unknown).toEqual([])
	})

	it('removes motion under prefers-reduced-motion', () => {
		const css = read(join(SRC, 'styles/variables/_semantic_variables.css'))
		expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)\s*\{[^}]*\{[^}]*--wlk-dur:\s*0s/)
	})
})
