import { mount } from '@vue/test-utils';
import WlkDatetime from './WlkDatetime.vue';
import {describe, test, expect} from "vitest";

describe('WlkDatetime.vue', () => {
    test('renders correctly with default props', () => {
        const wrapper = mount(WlkDatetime, {
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
        const wrapper = mount(WlkDatetime, {
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
        const wrapper = mount(WlkDatetime, {
            props: {
                label: 'Test Datetime',
                modelValue: null
            }
        });

        const input = wrapper.find('input');
        expect(input.element.value).toBe('');
    });

    test('formats valid date string and updates on model change to null and back', async () => {
        const wrapper = mount(WlkDatetime, {
            props: {
                label: 'Test Datetime',
                modelValue: '2025-01-15T14:30:00.000Z'
            }
        });

        const input = wrapper.find('input');
        // Check formatted input value
        const date = new Date('2025-01-15T14:30:00.000Z');
        const year = date.getFullYear().toString().padStart(4, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hour = date.getHours().toString().padStart(2, "0");
        const minute = date.getMinutes().toString().padStart(2, "0");
        const expectedFormatted = `${year}-${month}-${day}T${hour}:${minute}`;

        expect(input.element.value).toBe(expectedFormatted);

        // Update model to null
        await wrapper.setProps({ modelValue: null });
        expect(input.element.value).toBe('');

        // Update model back to date
        await wrapper.setProps({ modelValue: '2025-02-20T10:15:00.000Z' });
        const date2 = new Date('2025-02-20T10:15:00.000Z');
        const year2 = date2.getFullYear().toString().padStart(4, "0");
        const month2 = (date2.getMonth() + 1).toString().padStart(2, "0");
        const day2 = date2.getDate().toString().padStart(2, "0");
        const hour2 = date2.getHours().toString().padStart(2, "0");
        const minute2 = date2.getMinutes().toString().padStart(2, "0");
        const expectedFormatted2 = `${year2}-${month2}-${day2}T${hour2}:${minute2}`;

        expect(input.element.value).toBe(expectedFormatted2);
    });

    test('calls checkValidation and emits change with isValid', async () => {
        const wrapper = mount(WlkDatetime, {
            props: {
                label: 'Test Datetime',
                modelValue: null
            }
        });

        const input = wrapper.find('input');
        await input.trigger('blur');

        expect(wrapper.emitted('change')).toBeTruthy();
        expect(wrapper.emitted('change')?.[0]).toEqual([{ isValid: true }]);
    });
});