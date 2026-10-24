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

    const mountMenu = () =>
        mount(WlkDropDown, {
            attachTo: document.body,
            slots: {
                button: 'Actions',
                'drop-down-items': '<div role="menuitem" tabindex="-1" id="a">A</div><div role="menuitem" tabindex="-1" id="b">B</div>',
            },
        });

    test('button exposes menu state to assistive technology', async () => {
        const wrapper = mountMenu();
        const button = wrapper.get('button');
        const menu = wrapper.get('[role="menu"]');
        expect(button.attributes('aria-haspopup')).toBe('menu');
        expect(button.attributes('aria-controls')).toBe(menu.attributes('id'));
        expect(menu.attributes('aria-labelledby')).toBe(button.attributes('id'));
        expect(button.attributes('aria-expanded')).toBe('false');
        await button.trigger('click');
        expect(button.attributes('aria-expanded')).toBe('true');
        wrapper.unmount();
    });

    test('ArrowDown opens the menu and focuses the first item, arrows wrap', async () => {
        const wrapper = mountMenu();
        await wrapper.get('button').trigger('keydown', {key: 'ArrowDown'});
        await new Promise((resolve) => setTimeout(resolve));
        expect(document.activeElement?.id).toBe('a');

        await wrapper.get('[role="menu"]').trigger('keydown', {key: 'ArrowDown'});
        expect(document.activeElement?.id).toBe('b');
        await wrapper.get('[role="menu"]').trigger('keydown', {key: 'ArrowDown'});
        expect(document.activeElement?.id).toBe('a');
        await wrapper.get('[role="menu"]').trigger('keydown', {key: 'End'});
        expect(document.activeElement?.id).toBe('b');
        await wrapper.get('[role="menu"]').trigger('keydown', {key: 'Home'});
        expect(document.activeElement?.id).toBe('a');
        wrapper.unmount();
    });

    test('Escape closes the menu and returns focus to the button', async () => {
        const wrapper = mountMenu();
        await wrapper.get('button').trigger('click');
        await wrapper.get('[role="menu"]').trigger('keydown', {key: 'Escape'});
        expect(wrapper.get('button').attributes('aria-expanded')).toBe('false');
        expect(document.activeElement).toBe(wrapper.get('button').element);
        wrapper.unmount();
    });
});

