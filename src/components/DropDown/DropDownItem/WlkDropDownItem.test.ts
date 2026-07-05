import { mount } from '@vue/test-utils';
import WlkDropDownItem from './WlkDropDownItem.vue';
import {describe, test, expect} from "vitest";

describe('WlkDropDownItem.vue', () => {
    test('renders the component correctly', () => {
        const wrapper = mount(WlkDropDownItem, {
            slots: {
                default: 'Dropdown Item',
            },
        });

        expect(wrapper.text()).toContain('Dropdown Item');
        expect(wrapper.find('.drop-down-item').exists()).toBe(true);
    });

    // test('applies hover effect on mouse enter', async () => {
    //     const wrapper = mount(WlkDropDownItem, {
    //         slots: {
    //             default: 'Dropdown Item',
    //         },
    //     });
    //
    //     await wrapper.trigger('mouseenter');
    //
    //     expect(wrapper.classes()).toContain('hover');
    // });
});