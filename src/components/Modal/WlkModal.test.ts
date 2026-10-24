// WlkModel.spec.ts
import { describe, test, expect } from "vitest";
import WlkModal from "./WlkModal.vue";
import { mount } from "@vue/test-utils";
import { h, nextTick } from "vue";
import WlkModalHeader from "./ModalHeader/WlkModalHeader.vue";

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

    test("is a modal dialog named by its header", () => {
        const wrapper = mount(WlkModal, {
            slots: {default: () => h(WlkModalHeader, null, () => "Settings")},
        });
        const dialog = wrapper.get('[role="dialog"]');
        expect(dialog.attributes("aria-modal")).toBe("true");
        const header = wrapper.get(".wlk-modal-header");
        expect(dialog.attributes("aria-labelledby")).toBe(header.attributes("id"));
    });

    test("label prop names the dialog instead of the header", () => {
        const wrapper = mount(WlkModal, {props: {label: "Edit user"}});
        const dialog = wrapper.get('[role="dialog"]');
        expect(dialog.attributes("aria-label")).toBe("Edit user");
        expect(dialog.attributes("aria-labelledby")).toBeUndefined();
    });

    test("emits close on Escape", async () => {
        const wrapper = mount(WlkModal);
        await wrapper.get(".wlk-modal").trigger("keydown", {key: "Escape"});
        expect(wrapper.emitted("close")).toHaveLength(1);
    });

    test("moves focus in when opened, traps Tab, and restores focus when closed", async () => {
        const opener = document.createElement("button");
        document.body.appendChild(opener);
        opener.focus();

        const wrapper = mount(WlkModal, {
            attachTo: document.body,
            slots: {default: '<button id="first">First</button><button id="last">Last</button>'},
        });

        wrapper.element.classList.add("open");
        await new Promise((resolve) => setTimeout(resolve));
        await nextTick();
        expect(document.activeElement?.id).toBe("first");

        (document.getElementById("last") as HTMLElement).focus();
        await wrapper.get(".wlk-modal").trigger("keydown", {key: "Tab"});
        expect(document.activeElement?.id).toBe("first");

        await wrapper.get(".wlk-modal").trigger("keydown", {key: "Tab", shiftKey: true});
        expect(document.activeElement?.id).toBe("last");

        wrapper.element.classList.remove("open");
        await new Promise((resolve) => setTimeout(resolve));
        expect(document.activeElement).toBe(opener);

        wrapper.unmount();
        opener.remove();
    });
});
