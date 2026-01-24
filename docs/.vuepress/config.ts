import {viteBundler} from '@vuepress/bundler-vite'
import {defineUserConfig} from 'vuepress'
import {defaultTheme} from '@vuepress/theme-default'

export default defineUserConfig({
    bundler: viteBundler({
        viteOptions: {},
        vuePluginOptions: {},
    }),
    theme: defaultTheme({
        // set theme config here
    }),
})