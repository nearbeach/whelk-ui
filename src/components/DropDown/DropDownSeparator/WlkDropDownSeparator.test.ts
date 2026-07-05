import { mount } from '@vue/test-utils';
import WlkDropDownSeparator from './WlkDropDownSeparator.vue';
import {describe, test, expect} from "vitest";

describe('WlkDropDownSeparator.vue', () => {
    test('renders the component correctly', () => {
        const wrapper = mount(WlkDropDownSeparator);

        expect(wrapper.find('.wlk-drop-down-separator').exists()).toBe(true);
        expect(wrapper.find('hr').exists()).toBe(true);
    });
});