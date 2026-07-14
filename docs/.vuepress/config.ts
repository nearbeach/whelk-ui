import {viteBundler} from '@vuepress/bundler-vite'
import {defineUserConfig} from 'vuepress'
import {defaultTheme} from '@vuepress/theme-default'
import {registerComponentsPlugin} from '@vuepress/plugin-register-components'
import {getDirname, path} from 'vuepress/utils'

const __dirname = import.meta.dirname || getDirname(import.meta.url)


export default defineUserConfig({
    alias: {
        '@': path.resolve(__dirname, '../../src/'),
    },
    bundler: viteBundler({
        viteOptions: {},
        vuePluginOptions: {},
    }),
    description: 'A Vue 3 component library',
    lang: 'en-US',
    plugins: [
        registerComponentsPlugin({
            componentsDir: './src/components',
            components: {
                WlkButton: path.resolve(__dirname, '../../src/components/Button/WlkButton.vue'),
                WlkCard: path.resolve(__dirname, '../../src/components/Card/WlkCard.vue'),
                WlkSelect: path.resolve(__dirname, '../../src/components/Select/WlkSelect.vue'),
                WlkSelectRenderOptions: path.resolve(__dirname, '../../src/components/Select/SelectRenderOptions/WlkSelectRenderOptions.vue'),
            }
        })
    ],
    theme: defaultTheme({
        navbar: [
            {text: 'Home', link: '/'},
            {text: 'Components', link: '/components/components'}
        ],
        sidebar: {
            '/components/': [
                {
                    text: 'Components',
                    children: [
                        '/components/wlk-button.md',
                        '/components/wlk-card.md',

                        '/components/wlk-select.md'
                    ]
                }
            ]
        }
    }),
    title: 'Whelk UI'
})