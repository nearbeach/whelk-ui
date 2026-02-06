// DatetimeComponent.test.ts
import {describe, test, expect} from "vitest";
import DatetimeComponent from "./DatetimePicker.vue";
import {mount} from "@vue/test-utils";

describe("DatetimeComponent", async () => {
    const date = new Date();

    test("id will be 'input-start-datetime'", async () => {
        const wrapper = mount(DatetimeComponent, {
            props: {
                label: "Start Datetime",
                modelValue: date,
            }
        });

        const input = await wrapper.find("input");

        expect(input.element.id).toBe("input-start-datetime");
    });

    test("id will be 'input-end-datetime'", async () => {
        const wrapper = mount(DatetimeComponent, {
            props: {
                label: "End Datetime",
                modelValue: date,
            }
        });

        const input = await wrapper.find("input");

        expect(input.element.id).toBe("input-end-datetime");
        expect(input.element.id).not.toBe("input-start-datetime");
    });

    test("label will be 'Start Datetime'", async () => {
        const wrapper = mount(DatetimeComponent, {
            props: {
                label: "Start Datetime",
                modelValue: date,
            }
        });

        const label = await wrapper.find("label");

        expect(label.text()).toBe("Start Datetime");

    });

    test("label will be 'End Datetime'", async () => {
        const wrapper = mount(DatetimeComponent, {
            props: {
                label: "End Datetime",
                modelValue: date,
            }
        });

        const label = await wrapper.find("label");

        expect(label.text()).toBe("End Datetime");
        expect(label.text()).not.toBe("Start Datetime");
    });


    // TODO - Test time zone differences. i.e the user is in AEST and the server is in UTC
    // TODO - Test when there is a null passed through
    // TODO - Test when the model has a younger than min date model
    // TODO - Test many different times
    // TODO - Test the setter for the computed
});