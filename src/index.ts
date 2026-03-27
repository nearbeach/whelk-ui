import type {App} from 'vue'
import * as components from './components'
import './styles/style.css'

export * from './components'
export * from './utils'
export * from './types'
export * from './validation'
export * from './composables'

export default {
	install(app: App) {
		Object.entries(components).forEach(([name, component]) => {
			app.component(name, component)
		})
	}
}
