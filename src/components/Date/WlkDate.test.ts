import { mount } from '@vue/test-utils';
import WlkDate from './WlkDate.vue';
import {describe, test, expect} from "vitest";

describe('WlkDate.vue', () => {
    test('renders correctly with default props', () => {
        const wrapper = mount(WlkDate, {
            props: {
                label: 'Test Date',
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
                placeholderText: 'Enter date',
                status: '',
                tooltipMessage: '',
                tooltipTitle: '',
                validationRules: []
            }
        });

        expect(wrapper.find('input').attributes('placeholder')).toBe('Enter date');
    });
});