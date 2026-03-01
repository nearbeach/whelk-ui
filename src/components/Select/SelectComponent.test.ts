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

    test("Select Component - Ref values are correct part 1", async () => {
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

        // Group options
        expect(wrapper.vm.groupOptions?.length).toBe(2);
        expect(wrapper.vm.groupOptions).toEqual(["Animal", "Fruit"]);

        // Options without group
        expect(wrapper.vm.optionsWithoutGroup?.length).toBe(1);
        expect(wrapper.vm.optionsWithoutGroup).toEqual([
            {label: "Is Disabled", value: "is-disabled", optGroup: ""},
        ])

        // Options with group
        expect(wrapper.vm.optionsWithGroup?.length).toBe(7);
        expect(wrapper.vm.optionsWithGroup).toEqual([
            {label: "Cat", value: "cat", optGroup: "Animal"},
            {label: "Dog", value: "dog", optGroup: "Animal"},
            {label: "Horse", value: "horse", optGroup: "Animal"},
            {label: "Apple", value: "apple", optGroup: "Fruit"},
            {label: "Orange", value: "orange", optGroup: "Fruit"},
            {label: "Pear", value: "pear", optGroup: "Fruit"},
            {label: "Peach", value: "peach", optGroup: "Fruit"},
        ]);
    })


    test("Select Component - Ref values are correct part 2", async () => {
        const wrapper = mount(SelectComponent, {
            props: {
                isRequired: true,
                label: "Options",
                options: [
                    {label: "Socks", value: "socks", optGroup: "Fluffy Butt"},
                    {label: "Max", value: "max", optGroup: "Cat"},
                    {label: "Paddy", value: "paddy", optGroup: "Cat"},
                    {label: "Toby Tripod", value: "toby-tripod", optGroup: "Cat"},
                    {label: "Amputee Amber", value: "amputee-amber", optGroup: "Cat"},
                    {label: "Princess", value: "princess", optGroup: "Dog"},
                    {label: "Maddie", value: "maddie", optGroup: "Dog"},
                    {label: "Shamus", value: "shamus", optGroup: "Dog"},
                    {label: "Frank", value: "frank", optGroup: ""},
                    {label: "Sally", value: "sally", optGroup: ""},
                ],
            },
            model: "",
        });

        // Group options
        expect(wrapper.vm.groupOptions?.length).not.toBe(2);
        expect(wrapper.vm.groupOptions).not.toEqual(["Animal", "Fruit"]);
        expect(wrapper.vm.groupOptions?.length).toBe(3);
        expect(wrapper.vm.groupOptions).toEqual(["Fluffy Butt", "Cat", "Dog"]);

        // Options without group
        expect(wrapper.vm.optionsWithoutGroup?.length).not.toBe(1);
        expect(wrapper.vm.optionsWithoutGroup).not.toEqual([
            {label: "Is Disabled", value: "is-disabled", optGroup: ""},
        ])
        expect(wrapper.vm.optionsWithoutGroup?.length).toBe(2);
        expect(wrapper.vm.optionsWithoutGroup).toEqual([
            {label: "Frank", value: "frank", optGroup: ""},
            {label: "Sally", value: "sally", optGroup: ""},
        ])

        // Options with group
        expect(wrapper.vm.optionsWithGroup?.length).not.toBe(7);
        expect(wrapper.vm.optionsWithGroup).not.toEqual([
            {label: "Cat", value: "cat", optGroup: "Animal"},
            {label: "Dog", value: "dog", optGroup: "Animal"},
            {label: "Horse", value: "horse", optGroup: "Animal"},
            {label: "Apple", value: "apple", optGroup: "Fruit"},
            {label: "Orange", value: "orange", optGroup: "Fruit"},
            {label: "Pear", value: "pear", optGroup: "Fruit"},
            {label: "Peach", value: "peach", optGroup: "Fruit"},
        ]);
        expect(wrapper.vm.optionsWithGroup?.length).toBe(8);
        expect(wrapper.vm.optionsWithGroup).toEqual([
            {label: "Socks", value: "socks", optGroup: "Fluffy Butt"},
            {label: "Max", value: "max", optGroup: "Cat"},
            {label: "Paddy", value: "paddy", optGroup: "Cat"},
            {label: "Toby Tripod", value: "toby-tripod", optGroup: "Cat"},
            {label: "Amputee Amber", value: "amputee-amber", optGroup: "Cat"},
            {label: "Princess", value: "princess", optGroup: "Dog"},
            {label: "Maddie", value: "maddie", optGroup: "Dog"},
            {label: "Shamus", value: "shamus", optGroup: "Dog"}
        ]);
    })
})