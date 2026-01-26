import {defineUserConfig} from 'vuepress'
import {defaultTheme} from '@vuepress/theme-default'

export default defineUserConfig({
	lang: 'en-US',
	title: 'Whelk UI',
	description: 'A Vue 3 component library',

	theme: defaultTheme({
		navbar: [
			{text: 'Home', link: '/'},
			{text: 'Guide', link: '/guide/getting-started'},
			{text: 'Components', link: '/components/button'}
		],
		sidebar: {
			'/guide/': [
				{
					text: 'Guide',
					children: ['/guide/getting-started.md']
				}
			],
			'/components/': [
				{
					text: 'Components',
					children: ['/components/button.md']
				}
			]
		}
	})
})