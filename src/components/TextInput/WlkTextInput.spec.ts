import {describe, expect, test} from 'vitest'
import {mount} from '@vue/test-utils'
import WlkTextInput from "./WlkTextInput.vue"
import {required, minLength, maxLength} from "@/validation";

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe("WlkTextInput", async () => {
	// -----------------------------------------------------------------------
	// Rendering — label
	// -----------------------------------------------------------------------
	test("Text input renders the correct label", async () => {
		const wrapper = mount(
			WlkTextInput,
			{
				props: {
					label: "Hello World",
					modelValue: "",
				}
			}
		);

		// Label
		const label = wrapper.find("label");
		expect(label.element.textContent.trim()).toBe("Hello World");
	});

	test("Text input renders the correct new label", async () => {
		const wrapper = mount(
			WlkTextInput,
			{
				props: {
					label: "Text Input",
					modelValue: "",
				}
			}
		);

		// Label
		const label = wrapper.find("label");
		expect(label.element.textContent.trim()).not.toBe("Hello World");
		expect(label.element.textContent.trim()).toBe("Text Input");
	});

	// -----------------------------------------------------------------------
	// Rendering — required
	// -----------------------------------------------------------------------
	test("Text input does not render the * if not required", async () => {
		const wrapper = mount(
			WlkTextInput,
			{
				props: {
					label: "Hello World",
					modelValue: "",
				}
			}
		);

		// Span
		const spanList = wrapper.findAll("span");
		expect(spanList.length).toBe(0);
	});

	test("Text input renders the * if when required is passed through", async () => {
		const wrapper = mount(
			WlkTextInput,
			{
				props: {
					label: "Hello World",
					modelValue: "",
					validationRules: [required()]
				}
			}
		);

		// Span
		const spanList = wrapper.findAll("span");
		expect(spanList.length).toBe(1);
	});

	// -----------------------------------------------------------------------
	// Rendering — tooltip
	// -----------------------------------------------------------------------
	test("Text input does not render the tooltip when not passed through", async () => {
		const wrapper = mount(
			WlkTextInput,
			{
				props: {
					label: "Hello World",
					modelValue: "",
				}
			}
		);

		// Tooltip
		const tooltip = wrapper.findAll("[role=\"presentation\"]");
		expect(tooltip.length).toBe(0);
	});

	test("Text input renders the * if when required is passed through", async () => {
		const wrapper = mount(
			WlkTextInput,
			{
				props: {
					label: "Hello World",
					modelValue: "",
					tooltipMessage: "Tooltip Message",
					validationRules: [required()],
				}
			}
		);

		// Tooltip
		const tooltip = wrapper.findAll("[role=\"presentation\"]");
		expect(tooltip.length).toBe(0);
	});
});

describe("WlkTextInput - model", async () => {
	// -----------------------------------------------------------------------
	// Input — model
	// -----------------------------------------------------------------------
	test("Default input", async () => {
		const wrapper = mount(
			WlkTextInput,
			{
				props: {
					label: "Hello World",
					modelValue: "",
				}
			}
		);

		// Input
		const input = wrapper.find("input");
		expect(input.element.value).toBe("");
	});

	test("Default input - with 'my input' value", async () => {
		const wrapper = mount(
			WlkTextInput,
			{
				props: {
					label: "Hello World",
					modelValue: "my input",
				}
			}
		);

		// Input
		const input = wrapper.find("input");
		expect(input.element.value).not.toBe("");
		expect(input.element.value).toBe("my input");
	});

	// -----------------------------------------------------------------------
	// Input — placeholder
	// -----------------------------------------------------------------------
	test("Default placeholder", async () => {
		const wrapper = mount(
			WlkTextInput,
			{
				props: {
					label: "Hello World",
					modelValue: "",
				}
			}
		);

		// Input
		const input = wrapper.find("input");
		expect(input.element.placeholder).toBe("");
	});

	test("Text input renders the * if when required is passed through", async () => {
		const wrapper = mount(
			WlkTextInput,
			{
				props: {
					label: "Hello World",
					modelValue: "",
					placeholderText: "A simple placeholder",
				}
			}
		);

		// Input
		const input = wrapper.find("input");
		expect(input.element.placeholder).not.toBe("");
		expect(input.element.placeholder).toBe("A simple placeholder");
	});
});

describe("WlkTextInput - validation", async () => {
	// -----------------------------------------------------------------------
	// Input — required
	// -----------------------------------------------------------------------
	test("Required", async () => {
		const wrapper = mount(
			WlkTextInput,
			{
				props: {
					label: "hello world",
					modelValue: "",
					validationRules: [required()],
				}
			}
		);

		// Input
		await wrapper.find('input').trigger('focusout')

		// Error message
		const alert = wrapper.find("[role=\"alert\"]");
		expect(alert.element.textContent).toBe("This field is required");

		// Make error message go away
		const input = wrapper.find("input");
		await input.setValue("my input value");
		await input.trigger('focusout');
		expect(alert.element.textContent).toBe("");
	});

	// -----------------------------------------------------------------------
	// Input — minLength
	// -----------------------------------------------------------------------
	test("minLength", async () => {
		const wrapper = mount(
			WlkTextInput,
			{
				props: {
					label: "hello world",
					modelValue: "",
					validationRules: [minLength(10)],
				}
			}
		);

		// Input
		const input = wrapper.find("input");
		await input.trigger('focusout');

		// Error message
		const alert = wrapper.find("[role=\"alert\"]");
		expect(alert.element.textContent).toBe("Minimum length is 0 / 10");

		// Message is persistent
		await input.setValue("only one");
		await input.trigger('focusout');
		expect(alert.element.textContent).toBe("Minimum length is 8 / 10");

		// Make error message go away
		await input.setValue("my input value");
		await input.trigger('focusout');
		expect(alert.element.textContent).toBe("");
	});

	test("minLength - reached", async () => {
		const wrapper = mount(
			WlkTextInput,
			{
				props: {
					label: "hello world",
					modelValue: "My input text",
					validationRules: [minLength(5)],
				}
			}
		);

		// Input
		const input = wrapper.find("input");
		await input.trigger('focusout');

		// Error message
		const alert = wrapper.find("[role=\"alert\"]");
		expect(alert.element.textContent).toBe("");
	});

	// -----------------------------------------------------------------------
	// Input — maxLength
	// -----------------------------------------------------------------------
	test("maxLength", async () => {
		const wrapper = mount(
			WlkTextInput,
			{
				props: {
					label: "hello world",
					modelValue: "This input has over 10 characters",
					validationRules: [maxLength(10)],
				}
			}
		);

		// Input
		const input = wrapper.find("input");
		await input.trigger('focusout');

		// Error message
		const alert = wrapper.find("[role=\"alert\"]");
		expect(alert.element.textContent).toBe("Maximum length is 33 / 10");

		// Message is persistent
		await input.setValue("A simple max");
		await input.trigger('focusout');
		expect(alert.element.textContent).toBe("Maximum length is 12 / 10");

		// Make error message go away
		await input.setValue("simple");
		await input.trigger('focusout');
		expect(alert.element.textContent).toBe("");
	});
})
