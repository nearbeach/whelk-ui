// CardHeader.spec.ts
import { describe, test, expect } from "vitest";
import CardHeader from "./CardHeader.vue";
import { mount } from "@vue/test-utils";

describe("CardHeader", async () => {
    test("card header slot renders main content", () => {
        const wrapper = mount(CardHeader, {
            slots: {
                default: "Main Content",
            },
        });
        expect(wrapper.html()).toContain("Main Content");
        expect(wrapper.find(".wlk-card-header").text()).toContain("Main Content");
    });
});
