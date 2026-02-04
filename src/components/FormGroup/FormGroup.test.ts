// FormGroup.spec.ts
import {describe, test, expect} from "vitest";
import FormGroup from "./FormGroup.vue";
import {mount} from "@vue/test-utils";

describe("FormGroup", async () => {
    test("form group slot renders main content", () => {
        const wrapper = mount(FormGroup, {
            slots: {
                default: "Main Content",
            },
        });
        expect(wrapper.html()).toContain("Main Content");
        expect(wrapper.find(".wlk-form-group").text()).toContain("Main Content");
    });

    test("form group slot renders 'hello world'", async () => {
        const wrapper = mount(FormGroup, {
            slots: {
                default: "hello world",
            },
        });
        expect(wrapper.html()).toContain("hello world");
        expect(wrapper.html()).not.toContain("Main Content");
        expect(wrapper.find(".wlk-form-group").text()).toContain("hello world");
        expect(wrapper.find(".wlk-form-group").text()).not.toContain("Main Content");
    })
});
