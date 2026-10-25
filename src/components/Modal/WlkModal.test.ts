// WlkModel.spec.ts
import { describe, test, expect } from "vitest";
import WlkModal from "./WlkModal.vue";
import { mount } from "@vue/test-utils";

describe("WlkModal", async () => {
    test("modal slot renders main content", () => {
        const wrapper = mount(WlkModal, {
            slots: {
                default: "Main Content",
            },
        });
        expect(wrapper.html()).toContain("Main Content");
        expect(wrapper.find(".wlk-modal").text()).toContain("Main Content");
    });

    test("modal slot renders hello world", () => {
        const wrapper = mount(WlkModal, {
            slots: {
                default: "Hello World",
            },
        });
        expect(wrapper.html()).not.toContain("Main Content");
        expect(wrapper.find(".wlk-modal").text()).not.toContain("Main Content");
        expect(wrapper.html()).toContain("Hello World");
        expect(wrapper.find(".wlk-modal").text()).toContain("Hello World");
    });
});
