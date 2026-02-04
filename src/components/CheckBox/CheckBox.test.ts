// Checkbox.test.ts
import {describe, test, expect} from "vitest";
import CheckBox from "./CheckBox.vue";
import {mount} from "@vue/test-utils";

describe("CheckBox", async () => {
	test("checkbox renders with an id as 'checkbox-id'", async() => {
		const wrapper = mount(CheckBox, {
			props: {
				id: "id",
				label: "Tick me",
			},
		});

		const input = wrapper.find("input");

		expect(input.element.id).toBe("checkbox-id");
	});

	test("checkbox renders with an id as 'checkbox-yes'", async() => {
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

	test("checkbox renders with a label of 'Tick Me'", async() => {
		const wrapper = mount(CheckBox, {
			props: {
				id: "id",
				label: "Tick me",
			},
		});

		const label = wrapper.find("label");

		expect(label.text()).toBe("Tick me");
	});

	test("checkbox renders with a label of 'Subscribe'", async() => {
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

	test("checkbox's name matches the label - 'pizza'", async() => {
		const wrapper = mount(CheckBox, {
			props: {
				id: "id",
				label: "pizza",
			},
		});

		const input = wrapper.find("input");

		expect(input.element.name).toBe("pizza");
	});

	test("checkbox's name matches the label - 'cinnamon scrolls'", async() => {
		const wrapper = mount(CheckBox, {
			props: {
				id: "id",
				label: "cinnamon scrolls",
			},
		});

		const input = wrapper.find("input");

		expect(input.element.name).toBe("cinnamon scrolls");
		expect(input.element.name).not.toBe("pizza");
	});

	test("IsRequired - span appears with defaults", async() => {
		const wrapper = mount(CheckBox, {
			props: {
				id: "id",
				label: "cinnamon scrolls",
				isRequired: true,
			},
		});

		const span = wrapper.find("span");

		expect(span.element.ariaDescription).toBe("Field is required");
		expect(span.element.textContent).toBe("*");
	});

	test("IsRequired - required text = 'Please tick'", async() => {
		const wrapper = mount(CheckBox, {
			props: {
				id: "id",
				label: "cinnamon scrolls",
				isRequired: true,
				requiredText: "Please tick",
			},
		});

		const span = wrapper.find("span");

		expect(span.element.textContent).toBe("Please tick");
		expect(span.element.textContent).not.toBe("*");
	});

	test("IsRequired - required aria description = 'Please tick'", async() => {
		const wrapper = mount(CheckBox, {
			props: {
				id: "id",
				label: "cinnamon scrolls",
				isRequired: true,
				requiredAriaDescription: "Please tick",
			},
		});

		const span = wrapper.find("span");

		expect(span.element.ariaDescription).toBe("Please tick");
		expect(span.element.ariaDescription).not.toBe("Field is required");
	});
});
