import { mount } from '@vue/test-utils';
import WlkDropDown from './WlkDropDown.vue';
import {describe, test, expect} from "vitest";

describe('WlkDropDown.vue', () => {
    test('renders the component correctly', () => {
        const wrapper = mount(WlkDropDown, {
            slots: {
                button: 'Toggle Dropdown',
                'drop-down-items': '<div>Dropdown Item</div>',
            },
        });

        expect(wrapper.find('.wlk-drop-down').exists()).toBe(true);
        expect(wrapper.find('button').text()).toContain('Toggle Dropdown');
    });

    // test('toggles menu open and close on button click', async () => {
    //     const wrapper = mount(WlkDropDown, {
    //         slots: {
    //             button: 'Toggle Dropdown',
    //             'drop-down-items': '<div>Dropdown Item</div>',
    //         },
    //     });
    //
    //     // Initially menu should be closed
    //     expect(wrapper.find('.drop-down-items').exists()).toBe(false);
    //
    //     await wrapper.find('button').trigger('click');
    //
    //     // After first click, menu should be open
    //     expect(wrapper.find('.drop-down-items').exists()).toBe(true);
    //
    //     await wrapper.find('button').trigger('click');
    //
    //     // After second click, menu should be closed again
    //     expect(wrapper.find('.drop-down-items').exists()).toBe(false);
    // });
    //
    // test('closes the menu when backdrop is clicked', async () => {
    //     const wrapper = mount(WlkDropDown, {
    //         slots: {
    //             button: 'Toggle Dropdown',
    //             'drop-down-items': '<div>Dropdown Item</div>',
    //         },
    //     });
    //
    //     // Open the menu
    //     await wrapper.find('button').trigger('click');
    //
    //     expect(wrapper.find('.drop-down-backdrop').exists()).toBe(true);
    //
    //     // Click on backdrop to close the menu
    //     await wrapper.find('.drop-down-backdrop').trigger('click');
    //
    //     expect(wrapper.find('.drop-down-items').exists()).toBe(false);
    // });
});