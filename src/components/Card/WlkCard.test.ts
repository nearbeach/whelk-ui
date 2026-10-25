// CardComponent.test.ts
import { describe, test, expect } from "vitest";
import CardComponent from "./WlkCard.vue";
import { mount } from "@vue/test-utils";

describe("CardComponent", async () => {
    test("card component slot renders main content", () => {
        const wrapper = mount(CardComponent, {
            slots: {
                default: "Main Content",
            },
        });
        expect(wrapper.html()).toContain("Main Content");
        expect(wrapper.find(".wlk-card").text()).toContain("Main Content");
    });

    test("card component slot renders different content", () => {
        const wrapper = mount(CardComponent, {
            slots: {
                default: "Different Content",
            },
        });
        expect(wrapper.html()).not.toContain("Main Content");
        expect(wrapper.find(".wlk-card").text()).not.toContain("Main Content");
        expect(wrapper.html()).toContain("Different Content");
        expect(wrapper.find(".wlk-card").text()).toContain("Different Content");
    });
});
