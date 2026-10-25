// CardFooter.spec.ts
import { describe, test, expect } from "vitest";
import CardFooter from "./WlkCardFooter.vue";
import { mount } from "@vue/test-utils";

describe("CardFooter", async () => {
    test("card footer slot renders main content", () => {
        const wrapper = mount(CardFooter, {
            slots: {
                default: "Main Content",
            },
        });
        expect(wrapper.html()).toContain("Main Content");
        expect(wrapper.find(".wlk-card-footer").text()).toContain("Main Content");
    });

    test("card footer slot renders different content", () => {
        const wrapper = mount(CardFooter, {
            slots: {
                default: "Different content",
            },
        });
        expect(wrapper.html()).not.toContain("Main Content");
        expect(wrapper.html()).toContain("Different content");
        expect(wrapper.find(".wlk-card-footer").text()).not.toContain("Main Content");
        expect(wrapper.find(".wlk-card-footer").text()).toContain("Different content");
    });
});