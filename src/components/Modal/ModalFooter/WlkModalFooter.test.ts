// WlkModalFooter.spec.ts
import { describe, test, expect } from "vitest";
import WlkModalFooter from "./WlkModalFooter.vue";
import { mount } from "@vue/test-utils";

describe("WlkModalFooter", async () => {
    test("Modal footer slot renders main content", () => {
        const wrapper = mount(WlkModalFooter, {
            slots: {
                default: "Main Content",
            },
        });
        expect(wrapper.html()).toContain("Main Content");
        expect(wrapper.find(".wlk-modal-footer").text()).toContain("Main Content");
    });

    test("Modal footer slot renders hello world", () => {
        const wrapper = mount(WlkModalFooter, {
            slots: {
                default: "Hello World",
            },
        });
        expect(wrapper.html()).not.toContain("Main Content");
        expect(wrapper.find(".wlk-modal-footer").text()).not.toContain("Main Content");
        expect(wrapper.html()).toContain("Hello World");
        expect(wrapper.find(".wlk-modal-footer").text()).toContain("Hello World");
    });
});
