import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import postcssCustomMedia from 'postcss-custom-media'
import postcssNesting from 'postcss-nesting'
import postcssGlobalData from '@csstools/postcss-global-data'
import { resolve } from 'path'


// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'whelk-ui',
      fileName: 'whelk-ui',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
    css: {
        postcss: {
            plugins: [
                postcssNesting,
                postcssGlobalData({
                    files: [
                        './src/styles/variables/_media_variables.css',
                    ]
                }),
                postcssCustomMedia,
            ]
        }
    },
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
