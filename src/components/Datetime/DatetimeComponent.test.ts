// DatetimeComponent.test.ts
import {describe, test, expect} from "vitest";
import DatetimeComponent from "./DatetimeComponent.vue";
import {mount} from "@vue/test-utils";

describe("DatetimeComponent", async () => {
    const date = new Date();

    test("id will be 'input-start-datetime'", async () => {
        const wrapper = mount(DatetimeComponent, {
            props: {
                label: "Start Datetime",
                // @ts-ignore
                model: date,
            }
        });

        const input = await wrapper.find("input");

        expect(input.element.id).toBe("input-start-datetime");
    });

    test("id will be 'input-end-datetime'", async () => {
        const wrapper = mount(DatetimeComponent, {
            props: {
                label: "End Datetime",
                // @ts-ignore
                model: date,
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
                // @ts-ignore
                model: date,
            }
        });

        const label = await wrapper.find("label");

        expect(label.text()).toBe("Start Datetime");

    });

    test("label will be 'End Datetime'", async () => {
        const wrapper = mount(DatetimeComponent, {
            props: {
                label: "End Datetime",
                // @ts-ignore
                model: date,
            }
        });

        const label = await wrapper.find("label");

        expect(label.text()).toBe("End Datetime");
        expect(label.text()).not.toBe("Start Datetime");
    });


    // TODO - Test time zone differences. i.e the user is in AEST and the server is in UTC
    // TODO - Test when there is a null passed through
    // TODO - Test when the model has a younger than min date model
});