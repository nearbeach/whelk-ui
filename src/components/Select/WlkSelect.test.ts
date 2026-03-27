// SelectComponent.test.ts
import {describe, test, expect} from "vitest";
import SelectComponent from "./WlkSelect.vue";
import SelectRenderOptionGroups from "./SelectRenderOptionGroups/WlkSelectRenderOptionGroups.vue";
import SelectRenderOptions from "./SelectRenderOptions/WlkSelectRenderOptions.vue";
import {mount} from "@vue/test-utils";
import type {SelectOptionInterface} from "../../types/SelectOptionInterface.ts";
import {required} from "../../validation/rules/Required.ts"

describe("SelectComponent", async() => {
    test("select component renders", async () => {
        const wrapper = mount(
            SelectComponent,
            {
                model: "",
                props: {
                    label: "Options" as string,
                    modelValue: "",
                    options: [
                        {label: "Is Disabled", value: "is-disabled", optGroup: ""},
                        {label: "Cat", value: "cat", optGroup: "Animal"},
                        {label: "Dog", value: "dog", optGroup: "Animal"},
                        {label: "Horse", value: "horse", optGroup: "Animal"},
                        {label: "Apple", value: "apple", optGroup: "Fruit"},
                        {label: "Orange", value: "orange", optGroup: "Fruit"},
                        {label: "Pear", value: "pear", optGroup: "Fruit"},
                        {label: "Peach", value: "peach", optGroup: "Fruit"},
                    ] as SelectOptionInterface[],
                },
            }
        );

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
                label: "Options",
                modelValue: "",
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
                validationRules: [required()],
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
                modelValue: "",
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

        // Get components
        const renderGroupOptions = wrapper.findComponent(SelectRenderOptionGroups);
        const renderOptions = wrapper.findComponent(SelectRenderOptions);

        // Group options
        expect(renderGroupOptions.vm.groupOptions?.length).toBe(2);
        expect(renderGroupOptions.vm.groupOptions).toEqual(["Animal", "Fruit"]);

        // Options without group
        expect(renderOptions.vm.options?.length).toBe(1);
        expect(renderOptions.vm.options).toEqual([
            {label: "Is Disabled", value: "is-disabled", optGroup: ""},
        ])

        // Options with group
        expect(renderGroupOptions.vm.options?.length).toBe(7);
        expect(renderGroupOptions.vm.options).toEqual([
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
                modelValue: "",
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

        // Get components
        const renderGroupOptions = wrapper.findComponent(SelectRenderOptionGroups);
        const renderOptions = wrapper.findComponent(SelectRenderOptions);

        // Group options
        expect(renderGroupOptions.vm?.groupOptions?.length).not.toBe(2);
        expect(renderGroupOptions.vm.groupOptions).not.toEqual(["Animal", "Fruit"]);
        expect(renderGroupOptions.vm.groupOptions?.length).toBe(3);
        expect(renderGroupOptions.vm.groupOptions).toEqual(["Fluffy Butt", "Cat", "Dog"]);

        // Options without group
        expect(renderOptions.vm.options?.length).not.toBe(1);
        expect(renderOptions.vm.options).not.toEqual([
            {label: "Is Disabled", value: "is-disabled", optGroup: ""},
        ])
        expect(renderOptions.vm.options?.length).toBe(2);
        expect(renderOptions.vm.options).toEqual([
            {label: "Frank", value: "frank", optGroup: ""},
            {label: "Sally", value: "sally", optGroup: ""},
        ])

        // Options with group
        expect(renderGroupOptions.vm.options?.length).not.toBe(7);
        expect(renderGroupOptions.vm.options).not.toEqual([
            {label: "Cat", value: "cat", optGroup: "Animal"},
            {label: "Dog", value: "dog", optGroup: "Animal"},
            {label: "Horse", value: "horse", optGroup: "Animal"},
            {label: "Apple", value: "apple", optGroup: "Fruit"},
            {label: "Orange", value: "orange", optGroup: "Fruit"},
            {label: "Pear", value: "pear", optGroup: "Fruit"},
            {label: "Peach", value: "peach", optGroup: "Fruit"},
        ]);
        expect(renderGroupOptions.vm?.options?.length).toBe(8);
        expect(renderGroupOptions.vm?.options).toEqual([
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