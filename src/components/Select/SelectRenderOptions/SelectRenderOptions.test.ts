// SelectRenderOptions.test.ts
import {describe, test, expect} from 'vitest';
import SelectRenderOptions from './SelectRenderOptions.vue';
import {mount} from "@vue/test-utils";

describe('SelectRenderOptions', () => {
    test("select render option component renders", async () => {
        const wrapper = mount(SelectRenderOptions, {
            props: {
                options: [
                    {disabled: true, label: "Disabled Options", value: "disabled", optGroup: ""},
                    {label: "Cat", value: "cat", optGroup: ""},
                    {label: "Dog", value: "dog", optGroup: ""},
                    {label: "Horse", value: "horse", optGroup: ""},
                    {label: "Duck", value: "duck", optGroup: ""},
                ]
            },
        })

        const options = wrapper.findAll("option");

        expect(options.length).toBe(5);
    });

    test("select render option component has correct number of options rendered", async () => {
        const wrapper = mount(SelectRenderOptions, {
            props: {
                options: [
                    {disabled: true, label: "Disabled Options", value: "disabled", optGroup: ""},
                    {label: "Cat", value: "cat", optGroup: ""},
                    {label: "Dog", value: "dog", optGroup: ""},
                    {label: "Horse", value: "horse", optGroup: ""},
                    {label: "Duck", value: "duck", optGroup: ""},
                    {label: "Human", value: "human", optGroup: ""},
                ]
            },
        })

        const options = wrapper.findAll("option");

        expect(options.length).not.toBe(5);
        expect(options.length).toBe(6);
    });

    test("select render option renders options correctly", async () => {
        const wrapper = mount(SelectRenderOptions, {
            props: {
                options: [
                    {disabled: true, label: "Disabled Options", value: "disabled", optGroup: ""},
                ]
            },
        })

        const option = wrapper.find("option");

        // Make sure everything renders correctly
        expect(option.element.label).toBe("Disabled Options");
        expect(option.element.disabled).toBe(true);
        expect(option.element.value).toBe("disabled");

    });

    test("select render option renders options correctly", async () => {
        const wrapper = mount(SelectRenderOptions, {
            props: {
                options: [
                    {label: "Cat", value: "cat", optGroup: ""},
                ]
            },
        })

        const option = wrapper.find("option");

        // Make sure everything renders correctly
        expect(option.element.label).not.toBe("Disabled Options");
        expect(option.element.disabled).not.toBe(true);
        expect(option.element.value).not.toBe("disabled");
        expect(option.element.label).toBe("Cat");
        expect(option.element.disabled).toBe(false);
        expect(option.element.value).toBe("cat");
    });
})