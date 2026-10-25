import {describe, expect, test} from 'vitest'
import {mount} from '@vue/test-utils'
import WlkTextArea from "./WlkTextArea.vue"
import {required, minLength, maxLength} from "@/validation";

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe("WlkTextArea", async () => {
	// -----------------------------------------------------------------------
	// Rendering — label
	// -----------------------------------------------------------------------
	test("Text textarea renders the correct label", async () => {
		const wrapper = mount(
			WlkTextArea,
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

	test("Text textarea renders the correct new label", async () => {
		const wrapper = mount(
			WlkTextArea,
			{
				props: {
					label: "Text textarea",
					modelValue: "",
				}
			}
		);

		// Label
		const label = wrapper.find("label");
		expect(label.element.textContent.trim()).not.toBe("Hello World");
		expect(label.element.textContent.trim()).toBe("Text textarea");
	});

	// -----------------------------------------------------------------------
	// Rendering — required
	// -----------------------------------------------------------------------
	test("Text textarea does not render the * if not required", async () => {
		const wrapper = mount(
			WlkTextArea,
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

	test("Text textarea renders the * if when required is passed through", async () => {
		const wrapper = mount(
			WlkTextArea,
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
	test("Text textarea does not render the tooltip when not passed through", async () => {
		const wrapper = mount(
			WlkTextArea,
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

	test("Text textarea renders the * if when required is passed through", async () => {
		const wrapper = mount(
			WlkTextArea,
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

describe("WlkTextArea - model", async () => {
	// -----------------------------------------------------------------------
	// textarea — model
	// -----------------------------------------------------------------------
	test("Default textarea", async () => {
		const wrapper = mount(
			WlkTextArea,
			{
				props: {
					label: "Hello World",
					modelValue: "",
				}
			}
		);

		// textarea
		const textarea = wrapper.find("textarea");
		expect(textarea.element.value).toBe("");
	});

	test("Default textarea - with 'my textarea' value", async () => {
		const wrapper = mount(
			WlkTextArea,
			{
				props: {
					label: "Hello World",
					modelValue: "my textarea",
				}
			}
		);

		// textarea
		const textarea = wrapper.find("textarea");
		expect(textarea.element.value).not.toBe("");
		expect(textarea.element.value).toBe("my textarea");
	});

	// -----------------------------------------------------------------------
	// textarea — placeholder
	// -----------------------------------------------------------------------
	test("Default placeholder", async () => {
		const wrapper = mount(
			WlkTextArea,
			{
				props: {
					label: "Hello World",
					modelValue: "",
				}
			}
		);

		// textarea
		const textarea = wrapper.find("textarea");
		expect(textarea.element.placeholder).toBe("");
	});

	test("Text textarea renders the * if when required is passed through", async () => {
		const wrapper = mount(
			WlkTextArea,
			{
				props: {
					label: "Hello World",
					modelValue: "",
					placeholderText: "A simple placeholder",
				}
			}
		);

		// textarea
		const textarea = wrapper.find("textarea");
		expect(textarea.element.placeholder).not.toBe("");
		expect(textarea.element.placeholder).toBe("A simple placeholder");
	});
});

describe("WlkTextArea - validation", async () => {
	// -----------------------------------------------------------------------
	// textarea — required
	// -----------------------------------------------------------------------
	test("Required", async () => {
		const wrapper = mount(
			WlkTextArea,
			{
				props: {
					label: "hello world",
					modelValue: "",
					validationRules: [required()],
				}
			}
		);

		// textarea
		await wrapper.find('textarea').trigger('focusout')

		// Error message
		const alert = wrapper.find("[role=\"alert\"]");
		expect(alert.element.textContent).toBe("This field is required");

		// Make error message go away
		const textarea = wrapper.find("textarea");
		await textarea.setValue("my textarea value");
		await textarea.trigger('focusout');
		expect(alert.element.textContent).toBe("");
	});

	// -----------------------------------------------------------------------
	// textarea — minLength
	// -----------------------------------------------------------------------
	test("minLength", async () => {
		const wrapper = mount(
			WlkTextArea,
			{
				props: {
					label: "hello world",
					modelValue: "",
					validationRules: [minLength(10)],
				}
			}
		);

		// textarea
		const textarea = wrapper.find("textarea");
		await textarea.trigger('focusout');

		// Error message
		const alert = wrapper.find("[role=\"alert\"]");
		expect(alert.element.textContent).toBe("Minimum length is 0 / 10");

		// Message is persistent
		await textarea.setValue("only one");
		await textarea.trigger('focusout');
		expect(alert.element.textContent).toBe("Minimum length is 8 / 10");

		// Make error message go away
		await textarea.setValue("my textarea value");
		await textarea.trigger('focusout');
		expect(alert.element.textContent).toBe("");
	});

	test("minLength - reached", async () => {
		const wrapper = mount(
			WlkTextArea,
			{
				props: {
					label: "hello world",
					modelValue: "My textarea text",
					validationRules: [minLength(5)],
				}
			}
		);

		// textarea
		const textarea = wrapper.find("textarea");
		await textarea.trigger('focusout');

		// Error message
		const alert = wrapper.find("[role=\"alert\"]");
		expect(alert.element.textContent).toBe("");
	});

	// -----------------------------------------------------------------------
	// textarea — maxLength
	// -----------------------------------------------------------------------
	test("maxLength", async () => {
		const wrapper = mount(
			WlkTextArea,
			{
				props: {
					label: "hello world",
					modelValue: "This textarea has over 10 characters",
					validationRules: [maxLength(10)],
				}
			}
		);

		// textarea
		const textarea = wrapper.find("textarea");
		await textarea.trigger('focusout');

		// Error message
		const alert = wrapper.find("[role=\"alert\"]");
		expect(alert.element.textContent).toBe("Maximum length is 36 / 10");

		// Message is persistent
		await textarea.setValue("A simple max");
		await textarea.trigger('focusout');
		expect(alert.element.textContent).toBe("Maximum length is 12 / 10");

		// Make error message go away
		await textarea.setValue("simple");
		await textarea.trigger('focusout');
		expect(alert.element.textContent).toBe("");
	});
})
