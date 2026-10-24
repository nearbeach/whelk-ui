import {viteBundler} from '@vuepress/bundler-vite'
import {defineUserConfig} from 'vuepress'
import {defaultTheme} from '@vuepress/theme-default'
import {registerComponentsPlugin} from '@vuepress/plugin-register-components'
import {getDirname, path} from 'vuepress/utils'

const __dirname = import.meta.dirname || getDirname(import.meta.url)


export default defineUserConfig({
    alias: {
        '@': path.resolve(__dirname, '../../src/'),
        // Lets examples import exactly as consumers do: import { WlkButton } from 'whelk-ui'
        'whelk-ui': path.resolve(__dirname, '../../src/index.ts'),
    },
    bundler: viteBundler({
        viteOptions: {},
        vuePluginOptions: {},
    }),
    description: 'A Vue 3 component library',
    lang: 'en-US',
    plugins: [
        registerComponentsPlugin({
            // Only the Demo wrapper is global. Examples import components from 'whelk-ui' like consumers do.
            components: {
                Demo: path.resolve(__dirname, './components/Demo.vue'),
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
                    text: 'Layout & Content',
                    children: [
                        '/components/child_pages/wlk-button.md',
                        '/components/child_pages/wlk-card.md',
                        '/components/child_pages/wlk-modal.md',
                        '/components/child_pages/wlk-tabs.md',
                        '/components/child_pages/wlk-drop-down.md',
                        '/components/child_pages/wlk-tool-tip.md',
                    ]
                },
                {
                    text: 'Form Inputs',
                    children: [
                        '/components/child_pages/wlk-text-input.md',
                        '/components/child_pages/wlk-password-input.md',
                        '/components/child_pages/wlk-text-area.md',
                        '/components/child_pages/wlk-number-input.md',
                        '/components/child_pages/wlk-date.md',
                        '/components/child_pages/wlk-datetime.md',
                        '/components/child_pages/wlk-time.md',
                        '/components/child_pages/wlk-select.md',
                        '/components/child_pages/wlk-multi-select.md',
                        '/components/child_pages/wlk-checkbox.md',
                        '/components/child_pages/wlk-switch.md',
                        '/components/child_pages/wlk-file-upload.md',
                        '/components/child_pages/wlk-rich-text.md',
                    ]
                },
                {
                    text: 'Form Helpers',
                    children: [
                        '/components/child_pages/wlk-form-group.md',
                        '/components/child_pages/wlk-render-error-message.md',
                        '/components/child_pages/validation.md',
                    ]
                },
            ]
        }
    }),
    title: 'Whelk UI'
})