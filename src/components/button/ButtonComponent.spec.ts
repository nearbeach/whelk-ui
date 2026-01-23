import {describe, it, expect, beforeEach} from 'vitest'
import {mount} from '@vue/test-utils'
import ButtonComponent from './ButtonComponent.vue'
import {ObjectStateEnum} from '../../utils/enums/ObjectStateEnum'

describe('ButtonComponent', () => {
	let wrapper: any

	beforeEach(() => {
		wrapper = null
	})

	describe('Component Mounting & Rendering', () => {
		it('renders the component correctly', () => {
			wrapper = mount(ButtonComponent, {
				props: {
					label: 'Test Button',
				}
			})
			expect(wrapper.exists()).toBe(true)
			expect(wrapper.element.tagName).toBe('BUTTON')
		})

		it('renders slot content', () => {
			wrapper = mount(ButtonComponent, {
				props: {
					label: 'Test Button',
				},
				slots: {
					default: 'Click Me',
				}
			})
			expect(wrapper.text()).toContain('Click Me')
		})

		it('renders complex slot content', () => {
			wrapper = mount(ButtonComponent, {
				props: {
					label: 'Test Button',
				},
				slots: {
					default: '<span class="icon">🚀</span> Launch',
				}
			})
			expect(wrapper.html()).toContain('<span class="icon">🚀</span>')
			expect(wrapper.text()).toContain('Launch')
		})
	})

	describe('Props Validation', () => {
		it('requires label prop', () => {
			expect(ButtonComponent.props.label.required).toBe(true)
		})

		it('label prop must be a string', () => {
			expect(ButtonComponent.props.label.type).toBe(String)
		})

		it('objectState prop defaults to NoAction', () => {
			expect(ButtonComponent.props.objectState.default).toBe(ObjectStateEnum.NoAction)
		})

		it('objectState prop is not required', () => {
			expect(ButtonComponent.props.objectState.required).toBe(false)
		})

		it('validates objectState prop accepts valid enum values', () => {
			const validator = ButtonComponent.props.objectState.validator

			// Test all valid enum values
			Object.values(ObjectStateEnum).forEach(value => {
				expect(validator(value)).toBe(true)
			})
		})

		it('validates objectState prop rejects invalid values', () => {
			const validator = ButtonComponent.props.objectState.validator

			expect(validator('invalid-state')).toBe(false)
			expect(validator('random-value')).toBe(false)
			expect(validator('')).toBe(false)
		})
	})

	describe('Button State - Enabled/Disabled', () => {
		it('is enabled when objectState is NoAction', () => {
			wrapper = mount(ButtonComponent, {
				props: {
					label: 'Test Button',
					objectState: ObjectStateEnum.NoAction,
				}
			})
			expect(wrapper.attributes('disabled')).toBeUndefined()
		})

		it('is disabled when objectState is not NoAction', () => {
			// Test with various non-NoAction states
			const nonActionStates = Object.values(ObjectStateEnum).filter(
				state => state !== ObjectStateEnum.NoAction
			)

			nonActionStates.forEach(state => {
				wrapper = mount(ButtonComponent, {
					props: {
						label: 'Test Button',
						objectState: state,
					}
				})
				expect(wrapper.attributes('disabled')).toBeDefined()
			})
		})

		it('is enabled by default (when objectState not provided)', () => {
			wrapper = mount(ButtonComponent, {
				props: {
					label: 'Test Button',
				}
			})
			expect(wrapper.attributes('disabled')).toBeUndefined()
		})
	})

	describe('Object State Display', () => {
		it('hides object state span when objectState is NoAction', () => {
			wrapper = mount(ButtonComponent, {
				props: {
					label: 'Test Button',
					objectState: ObjectStateEnum.NoAction,
				}
			})
			const stateSpan = wrapper.find('.object-state')
			expect(stateSpan.isVisible()).toBe(false)
		})

		it('shows object state span when objectState is not NoAction', () => {
			// Assume ObjectStateEnum has values like 'Loading', 'Saving', etc.
			const nonActionStates = Object.values(ObjectStateEnum).filter(
				state => state !== ObjectStateEnum.NoAction
			)

			nonActionStates.forEach(state => {
				wrapper = mount(ButtonComponent, {
					props: {
						label: 'Test Button',
						objectState: state,
					}
				})
				const stateSpan = wrapper.find('.object-state')
				expect(stateSpan.isVisible()).toBe(true)
				expect(stateSpan.text()).toBe(state)
			})
		})

		it('displays correct objectState text', () => {
			const testStates = Object.values(ObjectStateEnum).filter(
				state => state !== ObjectStateEnum.NoAction
			)

			testStates.forEach(state => {
				wrapper = mount(ButtonComponent, {
					props: {
						label: 'Test Button',
						objectState: state,
					}
				})
				const stateSpan = wrapper.find('.object-state')
				expect(stateSpan.text()).toBe(state)
			})
		})

		it('hides state span by default (no objectState prop)', () => {
			wrapper = mount(ButtonComponent, {
				props: {
					label: 'Test Button',
				}
			})
			const stateSpan = wrapper.find('.object-state')
			expect(stateSpan.isVisible()).toBe(false)
		})
	})

	describe('Reactivity', () => {
		it('updates disabled state when objectState changes', async () => {
			wrapper = mount(ButtonComponent, {
				props: {
					label: 'Test Button',
					objectState: ObjectStateEnum.NoAction,
				}
			})

			expect(wrapper.attributes('disabled')).toBeUndefined()

			// Assume 'Loading' is a valid enum value
			const loadingState = Object.values(ObjectStateEnum).find(
				state => state !== ObjectStateEnum.NoAction
			)

			await wrapper.setProps({objectState: loadingState})
			expect(wrapper.attributes('disabled')).toBeDefined()

			await wrapper.setProps({objectState: ObjectStateEnum.NoAction})
			expect(wrapper.attributes('disabled')).toBeUndefined()
		})

		it('shows/hides object state span when objectState changes', async () => {
			wrapper = mount(ButtonComponent, {
				props: {
					label: 'Test Button',
					objectState: ObjectStateEnum.NoAction,
				}
			})

			const stateSpan = wrapper.find('.object-state')
			expect(stateSpan.isVisible()).toBe(false)

			const loadingState = Object.values(ObjectStateEnum).find(
				state => state !== ObjectStateEnum.NoAction
			)

			await wrapper.setProps({objectState: loadingState})
			expect(stateSpan.isVisible()).toBe(true)
			expect(stateSpan.text()).toBe(loadingState)

			await wrapper.setProps({objectState: ObjectStateEnum.NoAction})
			expect(stateSpan.isVisible()).toBe(false)
		})

		it('updates displayed state text when objectState changes', async () => {
			const states = Object.values(ObjectStateEnum).filter(
				state => state !== ObjectStateEnum.NoAction
			)

			// Need at least 2 non-NoAction states for this test
			if (states.length >= 2) {
				wrapper = mount(ButtonComponent, {
					props: {
						label: 'Test Button',
						objectState: states[0],
					}
				})

				const stateSpan = wrapper.find('.object-state')
				expect(stateSpan.text()).toBe(states[0])

				await wrapper.setProps({objectState: states[1]})
				expect(stateSpan.text()).toBe(states[1])
			}
		})
	})

	describe('User Interactions', () => {
		it('emits click event when enabled and clicked', async () => {
			wrapper = mount(ButtonComponent, {
				props: {
					label: 'Test Button',
					objectState: ObjectStateEnum.NoAction,
				}
			})

			await wrapper.trigger('click')
			expect(wrapper.emitted('click')).toBeTruthy()
			expect(wrapper.emitted('click')).toHaveLength(1)
		})

		it('does not emit click when disabled', async () => {
			const nonActionState = Object.values(ObjectStateEnum).find(
				state => state !== ObjectStateEnum.NoAction
			)

			wrapper = mount(ButtonComponent, {
				props: {
					label: 'Test Button',
					objectState: nonActionState,
				}
			})

			await wrapper.trigger('click')
			// Disabled buttons don't emit click events in the DOM
			expect(wrapper.emitted('click')).toBeFalsy()
		})

		it('can be focused when enabled', async () => {
			wrapper = mount(ButtonComponent, {
				props: {
					label: 'Test Button',
					objectState: ObjectStateEnum.NoAction,
				},
				attachTo: document.body,
			})

			await wrapper.trigger('focus')
			expect(wrapper.emitted('focus')).toBeTruthy()

			wrapper.unmount()
		})
	})

	describe('Accessibility', () => {
		it('has button semantics', () => {
			wrapper = mount(ButtonComponent, {
				props: {
					label: 'Test Button',
				}
			})
			expect(wrapper.element.tagName).toBe('BUTTON')
		})

		it('is keyboard accessible when enabled', async () => {
			wrapper = mount(ButtonComponent, {
				props: {
					label: 'Test Button',
					objectState: ObjectStateEnum.NoAction,
				}
			})

			await wrapper.trigger('keydown.enter')
			expect(wrapper.emitted('keydown')).toBeTruthy()
		})

		it('has disabled attribute when in loading/processing state', () => {
			const nonActionStates = Object.values(ObjectStateEnum).filter(
				state => state !== ObjectStateEnum.NoAction
			)

			nonActionStates.forEach(state => {
				wrapper = mount(ButtonComponent, {
					props: {
						label: 'Test Button',
						objectState: state,
					}
				})
				expect(wrapper.attributes('disabled')).toBeDefined()
			})
		})

		it('provides visual feedback of state to users', () => {
			const processingState = Object.values(ObjectStateEnum).find(
				state => state !== ObjectStateEnum.NoAction
			)

			wrapper = mount(ButtonComponent, {
				props: {
					label: 'Test Button',
					objectState: processingState,
				}
			})

			const stateSpan = wrapper.find('.object-state')
			expect(stateSpan.exists()).toBe(true)
			expect(stateSpan.isVisible()).toBe(true)
		})
	})

	describe('Component Structure', () => {
		it('has a button element as root', () => {
			wrapper = mount(ButtonComponent, {
				props: {
					label: 'Test Button',
				}
			})
			expect(wrapper.element.tagName).toBe('BUTTON')
		})

		it('contains object-state span element', () => {
			wrapper = mount(ButtonComponent, {
				props: {
					label: 'Test Button',
				}
			})
			const stateSpan = wrapper.find('.object-state')
			expect(stateSpan.exists()).toBe(true)
		})

		it('object-state span is inside button', () => {
			wrapper = mount(ButtonComponent, {
				props: {
					label: 'Test Button',
				}
			})
			const button = wrapper.find('button')
			const stateSpan = button.find('.object-state')
			expect(stateSpan.exists()).toBe(true)
		})
	})

	describe('Edge Cases', () => {
		it('handles empty slot content', () => {
			wrapper = mount(ButtonComponent, {
				props: {
					label: 'Test Button',
				},
				slots: {
					default: '',
				}
			})
			expect(wrapper.exists()).toBe(true)
		})

		it('handles rapid state changes', async () => {
			const states = Object.values(ObjectStateEnum)

			wrapper = mount(ButtonComponent, {
				props: {
					label: 'Test Button',
					objectState: states[0],
				}
			})

			// Rapidly change states
			for (const state of states) {
				await wrapper.setProps({objectState: state})
			}

			// Component should still be in valid state
			expect(wrapper.exists()).toBe(true)
		})

		it('handles slot content with multiple elements', () => {
			wrapper = mount(ButtonComponent, {
				props: {
					label: 'Test Button',
				},
				slots: {
					default: `
            <span>Icon</span>
            <span>Text</span>
            <span>Badge</span>
          `,
				}
			})
			expect(wrapper.findAll('span').length).toBeGreaterThanOrEqual(3)
		})
	})

	describe('Integration Tests', () => {
		it('maintains consistent state between disabled attribute and state display', async () => {
			wrapper = mount(ButtonComponent, {
				props: {
					label: 'Test Button',
					objectState: ObjectStateEnum.NoAction,
				}
			})

			// Initial state
			expect(wrapper.attributes('disabled')).toBeUndefined()
			expect(wrapper.find('.object-state').isVisible()).toBe(false)

			// Change to processing state
			const processingState = Object.values(ObjectStateEnum).find(
				state => state !== ObjectStateEnum.NoAction
			)
			await wrapper.setProps({objectState: processingState})

			expect(wrapper.attributes('disabled')).toBeDefined()
			expect(wrapper.find('.object-state').isVisible()).toBe(true)

			// Back to no action
			await wrapper.setProps({objectState: ObjectStateEnum.NoAction})

			expect(wrapper.attributes('disabled')).toBeUndefined()
			expect(wrapper.find('.object-state').isVisible()).toBe(false)
		})

		it('works correctly with all enum values in sequence', async () => {
			wrapper = mount(ButtonComponent, {
				props: {
					label: 'Test Button',
					objectState: ObjectStateEnum.NoAction,
				}
			})

			for (const state of Object.values(ObjectStateEnum)) {
				await wrapper.setProps({objectState: state})

				const shouldBeDisabled = state !== ObjectStateEnum.NoAction
				const shouldShowState = state !== ObjectStateEnum.NoAction

				if (shouldBeDisabled) {
					expect(wrapper.attributes('disabled')).toBeDefined()
				} else {
					expect(wrapper.attributes('disabled')).toBeUndefined()
				}

				expect(wrapper.find('.object-state').isVisible()).toBe(shouldShowState)

				if (shouldShowState) {
					expect(wrapper.find('.object-state').text()).toBe(state)
				}
			}
		})
	})
})