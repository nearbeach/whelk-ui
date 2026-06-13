// WlkModalHeader.spec.ts
import { describe, test, expect } from "vitest";
import WlkModalHeader from "./WlkModalHeader.vue";
import { mount } from "@vue/test-utils";

describe("WlkModalHeader", async () => {
    test("modal header slot renders main content", () => {
        const wrapper = mount(WlkModalHeader, {
            slots: {
                default: "Main Content",
            },
        });
        expect(wrapper.html()).toContain("Main Content");
        expect(wrapper.find(".wlk-modal-header").text()).toContain("Main Content");
    });
});
