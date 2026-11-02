import { mount } from '@vue/test-utils';
import WlkDate from './WlkDate.vue';
import {describe, test, expect, vi} from "vitest";

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

    test('opens the native picker on click and survives a refusal', async () => {
        const wrapper = mount(WlkDate, {props: {label: 'Test', modelValue: ''}});
        const input = wrapper.get('input');
        const showPicker = vi.fn();
        (input.element as HTMLInputElement).showPicker = showPicker;
        await input.trigger('click');
        expect(showPicker).toHaveBeenCalledTimes(1);

        (input.element as HTMLInputElement).showPicker = () => { throw new DOMException('blocked', 'NotAllowedError'); };
        await expect(input.trigger('click')).resolves.toBeUndefined();
        expect(input.attributes('onfocus')).toBeUndefined();
    });
});

