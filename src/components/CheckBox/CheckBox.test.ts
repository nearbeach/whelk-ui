// Checkbox.test.ts
import {describe, test, expect} from "vitest";
import CheckBox from "./CheckBox.vue";
import {mount} from "@vue/test-utils";

describe("CheckBox", async () => {
	test("checkbox renders with an id as 'checkbox-id'", () => {
		const wrapper = mount(CheckBox, {
			props: {
				id: "id",
				label: "Tick me",
			},
		});

		const input = wrapper.find("input");

		expect(input.element.id).toBe("checkbox-id");
	});

	test("checkbox renders with an id as 'checkbox-yes'", () => {
		const wrapper = mount(CheckBox, {
			props: {
				id: "yes",
				label: "Tick me",
			},
		});

		const input = wrapper.find("input");

		expect(input.element.id).toBe("checkbox-yes");
		expect(input.element.id).not.toBe("checkbox-id");
	});

	test("checkbox renders with a label of 'Tick Me'", () => {
		const wrapper = mount(CheckBox, {
			props: {
				id: "id",
				label: "Tick me",
			},
		});

		const label = wrapper.find("label");

		expect(label.text()).toBe("Tick me");
	});

	test("checkbox renders with a label of 'Subscribe'", () => {
		const wrapper = mount(CheckBox, {
			props: {
				id: "id",
				label: "Subscribe",
			},
		});

		const label = wrapper.find("label");

		expect(label.text()).not.toBe("Tick Me");
		expect(label.text()).toBe("Subscribe");
	});
});
