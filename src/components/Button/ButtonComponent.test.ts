// ButtonComponent.test.ts
import {describe, it, expect} from 'vitest'
import {mount} from '@vue/test-utils'
import ButtonComponent from './ButtonComponent.vue'

describe('ButtonComponent', async () => {
    it('mounts successfully', async () => {
        const wrapper = mount(ButtonComponent);

        // Check component can mount
        expect(wrapper.exists()).toBe(true)
    });

    it('enabled by default', async () => {
        const wrapper = mount(ButtonComponent);

        // Check to make sure the button isn't disabled
        const button = wrapper.get('button')
        expect(button.element.disabled).toBe(false);
    });

    it('default text will be "submit"', async () => {
        const wrapper = mount(ButtonComponent);

        // Check default text
        expect(wrapper.text()).toContain('Submit')
    });

    it('for is-action-running, default text will be "Updating"', async () => {
        const wrapper = mount(
            ButtonComponent,
            {
                props: {
                    isActionRunning: true,
                }
            }
        );

        // Check default text
        expect(wrapper.text()).toContain("Updating");
    });
});

describe('ButtonComponent - Disable', async () => {
    it('is-disabled flagged, button will be disabled', async () => {
        const wrapper = mount(
            ButtonComponent,
            {
                props: {
                    isDisabled: true,
                }
            }
        );

        // Check button is disabled
        const button = wrapper.find('button');
        expect(button.element.disabled).toBe(true);
    })

    it('is-action-running flagged, button will be disabled', async () => {
        const wrapper = mount(
            ButtonComponent,
            {
                props: {
                    isDisabled: true,
                }
            }
        );

        // Check button is disabled
        const button = wrapper.find('button');
        expect(button.element.disabled).toBe(true);
    })
})


describe('ButtonComponent - Slot', async () => {
    it('default slot renders correctly', async () => {
        const wrapper = mount(ButtonComponent, {
            slots: {
                default: 'Modified Button Text',
            },
        })

        expect(wrapper.text()).toContain('Modified Button Text')
        expect(wrapper.text()).not.toContain('Submit')
    })

    it('is-action-running flagged, appropriate slot renders correctly', async () => {

        const wrapper = mount(ButtonComponent, {
            props: {
                isActionRunning: true,
            },
            slots: {
                default: 'Modified Button Text',
                'action-state': 'Action Button Text',
            },
        })

        expect(wrapper.text()).toContain('Action Button Text')
        expect(wrapper.text()).not.toContain('Modified Button Text')
    })
})