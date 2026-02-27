// SelectComponent.test.ts
import {describe, test, expect} from "vitest";
import SelectComponent from "./SelectComponent.vue";
import {mount} from "@vue/test-utils";

describe("SelectComponent", async() => {
    test("select component renders", async () => {
        const wrapper = mount(SelectComponent, {
            props: {
                label: "Options",
                options: [
                    {label: "Is Disabled", value: "is-disabled", optGroup: ""},
                    {label: "Cat", value: "cat", optGroup: "Animal"},
                    {label: "Dog", value: "dog", optGroup: "Animal"},
                    {label: "Horse", value: "horse", optGroup: "Animal"},
                    {label: "Apple", value: "apple", optGroup: "Fruit"},
                    {label: "Orange", value: "orange", optGroup: "Fruit"},
                    {label: "Pear", value: "pear", optGroup: "Fruit"},
                    {label: "Peach", value: "peach", optGroup: "Fruit"},
                ],
            },
            model: "",
        });

        // Select
        const select = wrapper.find("select");
        expect(select.element.id).toBe("select-options")
        expect(select.element.name).toBe("Options");
        expect(select.element.value).toBe("");

        // Label
        const label = wrapper.find("label");
        expect(label.element.textContent.trim()).toBe("Options");

        // TODO - need to test to make sure we have;
        // 2 option groups
        // each option group has the correct number of options in it
    });

    test("select component - renders is required correctly", async () => {
        const wrapper = mount(SelectComponent, {
            props: {
                isRequired: true,
                label: "Options",
                options: [
                    {label: "Is Disabled", value: "is-disabled", optGroup: ""},
                    {label: "Cat", value: "cat", optGroup: "Animal"},
                    {label: "Dog", value: "dog", optGroup: "Animal"},
                    {label: "Horse", value: "horse", optGroup: "Animal"},
                    {label: "Apple", value: "apple", optGroup: "Fruit"},
                    {label: "Orange", value: "orange", optGroup: "Fruit"},
                    {label: "Pear", value: "pear", optGroup: "Fruit"},
                    {label: "Peach", value: "peach", optGroup: "Fruit"},
                ],
            },
            model: "",
        });

        // Label
        const label = wrapper.find("label");
        expect(label.element.textContent.trim()).toBe("Options*");
    });
})