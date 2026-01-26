import type {App} from 'vue'
import * as components from './components'
import './styles/style.css'

export * from './components'
export * from './utils'

export default {
	install(app: App) {
		Object.entries(components).forEach(([name, component]) => {
			app.component(name, component)
		})
	}
}
