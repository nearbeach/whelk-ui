import { mount } from '@vue/test-utils';
import WlkDate from './WlkDate.vue';
import {describe, test, expect} from "vitest";

describe('WlkDate.vue', () => {
    test('renders correctly with default props', () => {
        const wrapper = mount(WlkDate, {
            props: {
                label: 'Test Date',
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
        const wrapper = mount(WlkDate, {
            props: {
                label: 'Test Date',
                modelValue: null,
                placeholderText: 'Enter date',
                status: '',
                tooltipMessage: '',
                tooltipTitle: '',
                validationRules: []
            }
        });

        expect(wrapper.find('input').attributes('placeholder')).toBe('Enter date');
    });

    test('accepts null modelValue and renders empty input', () => {
        const wrapper = mount(WlkDate, {
            props: {
                label: 'Test Date',
                modelValue: null
            }
        });

        const input = wrapper.find('input');
        expect(input.element.value).toBe('');
    });

    test('accepts string modelValue and updates on change', async () => {
        const wrapper = mount(WlkDate, {
            props: {
                label: 'Test Date',
                modelValue: '2025-01-15'
            }
        });

        const input = wrapper.find('input');
        expect(input.element.value).toBe('2025-01-15');

        await wrapper.setProps({ modelValue: null });
        expect(input.element.value).toBe('');
    });
});