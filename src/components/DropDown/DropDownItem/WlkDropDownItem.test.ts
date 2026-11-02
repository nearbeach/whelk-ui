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

    test('is a focusable menu item that Enter and Space activate', async () => {
        const wrapper = mount(WlkDropDownItem, {slots: {default: 'Edit'}});
        expect(wrapper.attributes('role')).toBe('menuitem');
        expect(wrapper.attributes('tabindex')).toBe('-1');

        await wrapper.trigger('keydown', {key: 'Enter'});
        await wrapper.trigger('keydown', {key: ' '});
        expect(wrapper.emitted('click')).toHaveLength(2);
    });
});

