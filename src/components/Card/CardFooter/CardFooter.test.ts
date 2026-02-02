// CardFooter.spec.ts
import { describe, test, expect } from "vitest";
import CardFooter from "./CardFooter.vue";
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
});
