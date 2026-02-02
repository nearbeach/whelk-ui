// CardComponent.spec.ts
import { describe, test, expect } from "vitest";
import CardComponent from "./CardComponent.vue";
import { mount } from "@vue/test-utils";

describe("CardComponent", async () => {
    test("card component slot renders main content", () => {
        const wrapper = mount(CardComponent, {
            slots: {
                default: "Main Content",
            },
        });
        expect(wrapper.html()).toContain("Main Content");
        expect(wrapper.find(".wlk-card-component").text()).toContain("Main Content");
    });
});
