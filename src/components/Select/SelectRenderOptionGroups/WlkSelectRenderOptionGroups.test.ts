// SelectRenderOptionGroups.test.ts
import {describe, test, expect} from "vitest";
import {mount} from "@vue/test-utils";
import SelectRenderOptionGroups from "./WlkSelectRenderOptionGroups.vue";

describe("SelectRenderOptionGroups", () => {
    test("select render option groups - renders and filters correctly", async () => {
        const wrapper = mount(SelectRenderOptionGroups, {
            props: {
                groupOptions: [
                    "Animal",
                    "Human",
                ],
                options: [
                    {label: "Cat", value: "cat", optGroup: "Animal"},
                    {label: "Dog", value: "dog", optGroup: "Animal"},
                    {label: "Horse", value: "horse", optGroup: "Animal"},
                    {label: "Human", value: "human", optGroup: "Human"}
                ],
            }
        });

        // Check Opt Groups
        const optgroups = wrapper.findAll("optgroup");
        expect(optgroups.length).toBe(2);

        // Animal opt group
        const animalOptGroup = optgroups[0].findAll("option");
        expect(animalOptGroup.length).toBe(3);

        // Human opt group
        const humanOptGroup = optgroups[1].findAll("option");
        expect(humanOptGroup.length).toBe(1);
    })

    test("select render option groups - renders option group correctly", async () => {
        const wrapper = mount(SelectRenderOptionGroups, {
            props: {
                groupOptions: [
                    "Animal",
                ],
                options: [
                    {label: "Cat", value: "cat", optGroup: "Animal"},
                    {label: "Dog", value: "dog", optGroup: "Animal"},
                    {label: "Horse", value: "horse", optGroup: "Animal"},
                ],
            }
        });

        const optionGroup = wrapper.find("optgroup");
        expect(optionGroup.element.label).toBe("Animal");
    });

    test("select render option groups - renders option group correctly", async () => {
        const wrapper = mount(SelectRenderOptionGroups, {
            props: {
                groupOptions: [
                    "Human",
                ],
                options: [
                    {label: "Human", value: "human", optGroup: "Human"}
                ],
            }
        });

        const optionGroup = wrapper.find("optgroup");
        expect(optionGroup.element.label).not.toBe("Animal");
        expect(optionGroup.element.label).toBe("Human");
    });
})
