import { mount } from '@vue/test-utils';
import WlkTime from './WlkTime.vue';
import {describe, test, expect} from "vitest";

describe('WlkTime.vue', () => {
    test('renders correctly with default props', () => {
        const wrapper = mount(WlkTime, {
            props: {
                label: 'Test Time',
                modelValue: null,
                placeholderText: '',
                status: '',
                tooltipMessage: '',
                tooltipTitle: '',
                validationRules: []
            }
        });

        expect(wrapper.exists()).toBe(true);
    });

    test('renders with a placeholder', () => {
        const wrapper = mount(WlkTime, {
            props: {
                label: 'Test Time',
                modelValue: null,
                placeholderText: 'Enter time',
                status: '',
                tooltipMessage: '',
                tooltipTitle: '',
                validationRules: []
            }
        });

        expect(wrapper.find('input').attributes('placeholder')).toBe('Enter time');
    });

    test('accepts null modelValue and renders empty input', () => {
        const wrapper = mount(WlkTime, {
            props: {
                label: 'Test Time',
                modelValue: null
            }
        });

        const input = wrapper.find('input');
        expect(input.element.value).toBe('');
    });

    test('accepts string modelValue and updates on change', async () => {
        const wrapper = mount(WlkTime, {
            props: {
                label: 'Test Time',
                modelValue: '14:30'
            }
        });

        const input = wrapper.find('input');
        expect(input.element.value).toBe('14:30');

        await wrapper.setProps({ modelValue: null });
        expect(input.element.value).toBe('');
    });
});
