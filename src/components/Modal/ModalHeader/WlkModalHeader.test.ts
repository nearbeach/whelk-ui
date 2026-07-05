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

    test("modal header slot renders hello world", () => {
        const wrapper = mount(WlkModalHeader, {
            slots: {
                default: "Hello World",
            },
        });
        expect(wrapper.html()).not.toContain("Main Content");
        expect(wrapper.find(".wlk-modal-header").text()).not.toContain("Main Content");
        expect(wrapper.html()).toContain("Hello World");
        expect(wrapper.find(".wlk-modal-header").text()).toContain("Hello World");
    });
});
