import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssNesting from 'postcss-nesting'
import {resolve} from 'path'
import {playwright} from "@vitest/browser-playwright";
import {configDefaults} from "vitest/config";
import {fileURLToPath} from "node:url";


// https://vite.dev/config/
export default defineConfig({
	build: {
		cssCodeSplit: true,
		lib: {
			entry: {
                addObject: resolve(__dirname, 'src/components/add_object/AddObject.vue'),
				button: resolve(__dirname, 'src/components/button/ButtonComponent.vue'),
                card: resolve(__dirname, 'src/components/card/CardComponent.vue'),
                checkBox: resolve(__dirname, 'src/components/check_box/CheckBox.vue'),
                datetime: resolve(__dirname, 'src/components/datetime/DatetimeComponent.vue'),
                dropDown: resolve(__dirname, 'src/components/drop_down/DropDown.vue'),
                formGroup: resolve(__dirname, 'src/components/form_group/FormGroup.vue'),
                numberInput: resolve(__dirname, 'src/components/number_input/NumberInput.vue'),
                passwordInput: resolve(__dirname, 'src/components/password_input/PasswordInput.vue'),
                renderErrorMessage: resolve(__dirname, 'src/components/render_error_message/RenderErrorMessage.vue'),
                switch: resolve(__dirname, 'src/components/switch/SwitchComponent.vue'),
                textArea: resolve(__dirname, 'src/components/text_area/TextArea.vue'),
                textInput: resolve(__dirname, 'src/components/text_input/TextInput.vue'),
                toolTip: resolve(__dirname, 'src/components/tool_tip/ToolTip.vue'),
			},
			name: 'whelk-ui',
			formats: ['es', 'cjs']
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				globals: {
					vue: 'Vue',
				},
				preserveModules: true,
				preserveModulesRoot: 'src'
			},
		},
	},
	css: {
		postcss: {
			plugins: [
				postcssNesting,
			]
		}
	},
	plugins: [
		vue(),
	],
    test: {
        browser: {
            enabled: true,
            provider: playwright(),
            instances: [
                {browser: 'chromium'},
            ],
        },
        coverage: {
            provider: 'v8',
            exclude: [
                'e2e/**',
                'src/main.ts'
            ],
        },
        environment: 'jsdom',
        exclude: [
            ...configDefaults.exclude,
            'e2e/**'
        ],
        root: fileURLToPath(
            new URL('./', import.meta.url)
        ),
    }
})
