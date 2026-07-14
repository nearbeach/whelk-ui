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
                WlkCardFooter: path.resolve(__dirname, '../../src/components/Card/CardFooter/WlkCardFooter.vue'),
                WlkCardHeader: path.resolve(__dirname, '../../src/components/Card/CardHeader/WlkCardHeader.vue'),
                WlkCheckBox: path.resolve(__dirname, '../../src/components/CheckBox/WlkCheckBox.vue'),
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
                        '/components/child_pages/wlk-button.md',
                        '/components/child_pages/wlk-card.md',
                        '/components/child_pages/wlk-checkbox.md',
                    ]
                }
            ]
        }
    }),
    title: 'Whelk UI'
})