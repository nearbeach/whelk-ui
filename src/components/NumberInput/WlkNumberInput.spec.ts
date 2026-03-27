import {describe, expect, test} from 'vitest'
import {mount} from '@vue/test-utils'
import WlkNumberInput from './WlkNumberInput.vue'
import {maxValue} from "../../validation/rules/MaxValue.ts"
import {minValue} from "../../validation/rules/MinValue.ts"

describe("NumberPicker", async () => {
    test("Number picker renders the correct label", async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Hello World",
                }
            }
        );

        // Label
        const label = wrapper.find("label");
        expect(label.element.textContent.trim()).toBe("Hello World");
    });

    test("Number picker renders the correct new label", async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Number Picker",
                }
            }
        );

        // Label
        const label = wrapper.find("label");
        expect(label.element.textContent.trim()).toBe("Number Picker");
        expect(label.element.textContent.trim()).not.toBe("Hello World");
    });
})

// INCREMENTING ++
describe("NumberInput - Increment", async () => {
    test('counters increase from 0 to 1 when increase is clicked', async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Number Picker",
                }
            }
        );

        // Assert input value is default 0
        expect(wrapper.find('input').element.value).toBe("0");

        // Find the + button
        const buttons = wrapper.findAll('button');
        const targetButton = buttons.filter(buttonWrapper =>
            buttonWrapper.text().includes('+')
        )[0];

        // Click on the + button
        await targetButton?.trigger('click');

        // Check the value has been increased by 1
        expect(wrapper.find('input').element.value).toBe("1");
    });

    test('increment to the max value and check button gets disabled', async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Number Picker",
                    validationRules: [maxValue(10)],
                    modelValue: 9,
                }
            }
        );

        // Assert input value is default 10
        expect(wrapper.find('input').element.value).toBe("9");

        // Find the + button
        const buttons = wrapper.findAll('button');
        const targetButton = buttons.filter(buttonWrapper =>
            buttonWrapper.text().includes('+')
        )[0];

        // Expect to be disabled
        expect(targetButton?.element.disabled).toBe(false);

        // Click on the + button
        await targetButton?.trigger('click');

        // Check the value has changed, and button is disabled
        expect(wrapper.find('input').element.value).toBe("10");
        expect(targetButton?.element.disabled).toBe(true);
    });

    test('increment button is disabled and will not increment the value', async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Number Picker",
                    validationRules: [maxValue(10)],
                    modelValue: 10,
                }
            }
        );

        // Assert input value is default 9
        expect(wrapper.find('input').element.value).toBe("10");

        // Find the + button
        const buttons = wrapper.findAll('button');
        const targetButton = buttons.filter(buttonWrapper =>
            buttonWrapper.text().includes('+')
        )[0];

        // Expect to be disabled
        expect(targetButton?.element.disabled).toBe(true);

        // Click on the + button
        await targetButton?.trigger('click');

        // Check the value has not changed
        expect(wrapper.find('input').element.value).toBe("10");
    });

    test('increment by 5 units', async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Number Picker",
                    validationRules: [maxValue(10)],
                    modelValue: 0,
                    stepIncrement: 5,
                }
            }
        );

        // Assert input value is default 0
        expect(wrapper.find('input').element.value).toBe("0");

        // Find the + button
        const buttons = wrapper.findAll('button');
        const targetButton = buttons.filter(buttonWrapper =>
            buttonWrapper.text().includes('+')
        )[0];

        // Click on the + button
        await targetButton?.trigger('click');

        // Check the value added 5 units
        expect(wrapper.find('input').element.value).toBe("5");
    });


    test('increment past the maxValue, results should return max value', async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Number Picker",
                    validationRules: [maxValue(10)],
                    modelValue: 0,
                    stepIncrement: 15,
                }
            }
        );

        // Assert input value is default 0
        expect(wrapper.find('input').element.value).toBe("0");

        // Find the + button
        const buttons = wrapper.findAll('button');
        const targetButton = buttons.filter(buttonWrapper =>
            buttonWrapper.text().includes('+')
        )[0];

        // Click on the + button
        await targetButton?.trigger('click');

        // Check the value has not changed
        expect(wrapper.find('input').element.value).toBe("10");
    });

    test('increment by 1 to the max javascript integer value', async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Number Picker",
                    validationRules: [maxValue(Number.MAX_SAFE_INTEGER)],
                    modelValue: Number.MAX_SAFE_INTEGER - 1,
                    stepIncrement: 1,
                }
            }
        );

        // Assert input value is default 0
        expect(wrapper.find('input').element.value).toBe(`${Number.MAX_SAFE_INTEGER - 1}`);

        // Find the + button
        const buttons = wrapper.findAll('button');
        const targetButton = buttons.filter(buttonWrapper =>
            buttonWrapper.text().includes('+')
        )[0];

        // Click on the + button
        await targetButton?.trigger('click');

        // Check the value has not changed
        expect(wrapper.find('input').element.value).toBe(`${Number.MAX_SAFE_INTEGER}`);
    });


    test('increment by 10 PAST the max javascript integer value', async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Number Picker",
                    validationRules: [maxValue(Number.MAX_SAFE_INTEGER)],
                    modelValue: Number.MAX_SAFE_INTEGER - 1,
                    stepIncrement: 10,
                }
            }
        );

        // Assert input value is default 0
        expect(wrapper.find('input').element.value).toBe(`${Number.MAX_SAFE_INTEGER - 1}`);

        // Find the + button
        const buttons = wrapper.findAll('button');
        const targetButton = buttons.filter(buttonWrapper =>
            buttonWrapper.text().includes('+')
        )[0];

        // Click on the + button
        await targetButton?.trigger('click');

        // Check the value has not changed
        expect(wrapper.find('input').element.value).toBe(`${Number.MAX_SAFE_INTEGER}`);
    });

    test('counters increase from 0 to 1 when increase is clicked, even with a -1 step increment', async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Number Picker",
                    modelValue: 0,
                    stepIncrement: -1,
                }
            }
        );

        // Assert input value is default 0
        expect(wrapper.find('input').element.value).toBe("0");

        // Find the + button
        const buttons = wrapper.findAll('button');
        const targetButton = buttons.filter(buttonWrapper =>
            buttonWrapper.text().includes('+')
        )[0];

        // Click on the + button
        await targetButton?.trigger('click');

        // Check the value has not changed
        expect(wrapper.find('input').element.value).toBe("1");
    });

    test('counters increase from -10 to -9 when increase is clicked', async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Number Picker",
                    modelValue: -10,
                }
            }
        );

        // Assert input value is default
        expect(wrapper.find('input').element.value).toBe("-10");

        // Find the + button
        const buttons = wrapper.findAll('button');
        const targetButton = buttons.filter(buttonWrapper =>
            buttonWrapper.text().includes('+')
        )[0];

        // Click on the + button
        await targetButton?.trigger('click');

        // Check the value has not changed
        expect(wrapper.find('input').element.value).toBe("-9");
    });

    test('counters increase from -12 to -10 when increase is clicked, even with a -2 step increment', async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Number Picker",
                    modelValue: -12,
                    stepIncrement: -2,
                }
            }
        );

        // Assert input value is default 0
        expect(wrapper.find('input').element.value).toBe("-12");

        // Find the + button
        const buttons = wrapper.findAll('button');
        const targetButton = buttons.filter(buttonWrapper =>
            buttonWrapper.text().includes('+')
        )[0];

        // Click on the + button
        await targetButton?.trigger('click');

        // Check the value has not changed
        expect(wrapper.find('input').element.value).toBe("-10");
    });

    test('we can still increment even when the model value is less than the minimum value. Will instantly pop to minimum number', async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Number Picker",
                    modelValue: -15,
                    validationRules: [minValue(-10)]
                }
            }
        );

        // Assert input value is default 0
        expect(wrapper.find('input').element.value).toBe("-15");

        // Find the + button
        const buttons = wrapper.findAll('button');
        const targetButton = buttons.filter(buttonWrapper =>
            buttonWrapper.text().includes('+')
        )[0];

        // Click on the + button
        await targetButton?.trigger('click');

        // Check the value has not changed
        expect(wrapper.find('input').element.value).toBe("-10");
    });
});

// DECREMENTING ++
describe("NumberInput - Decrementing", async () => {

    test('counters decreases from 0 to -1 when decrease is clicked', async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Number Picker",
                }
            }
        );

        // Assert input value is default 0
        expect(wrapper.find('input').element.value).toBe("0");

        // Find the + button
        const buttons = wrapper.findAll('button');
        const targetButton = buttons.filter(buttonWrapper =>
            buttonWrapper.text().includes('-')
        )[0];

        // Click on the + button
        await targetButton?.trigger('click');

        // Check the value has been increased by 1
        expect(wrapper.find('input').element.value).toBe("-1");
    });

    test('decrease to the min value and check button gets disabled', async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Number Picker",
                    modelValue: -9,
                    validationRules: [minValue(-10)]
                }
            }
        );

        // Assert input value is default
        expect(wrapper.find('input').element.value).toBe("-9");

        // Find the + button
        const buttons = wrapper.findAll('button');
        const targetButton = buttons.filter(buttonWrapper =>
            buttonWrapper.text().includes('-')
        )[0];

        // Expect to be disabled
        expect(targetButton?.element.disabled).toBe(false);

        // Click on the - button
        await targetButton?.trigger('click');

        // Check the value has changed, and button is disabled
        expect(wrapper.find('input').element.value).toBe("-10");
        expect(targetButton?.element.disabled).toBe(true);
    });

    test('decrement button is disabled and will not decrease the value', async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Number Picker",
                    modelValue: -10,
                    validationRules: [minValue(-10)]
                }
            }
        );

        // Assert input value is default
        expect(wrapper.find('input').element.value).toBe("-10");

        // Find the + button
        const buttons = wrapper.findAll('button');
        const targetButton = buttons.filter(buttonWrapper =>
            buttonWrapper.text().includes('-')
        )[0];

        // Expect to be disabled
        expect(targetButton?.element.disabled).toBe(true);

        // Click on the - button
        await targetButton?.trigger('click');

        // Check the value has not changed
        expect(wrapper.find('input').element.value).toBe("-10");
    });

    test('decrement by 5 units', async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Number Picker",
                    modelValue: 0,
                    stepIncrement: 5,
                    validationRules: [minValue(-10)]
                }
            }
        );

        // Assert input value is default 0
        expect(wrapper.find('input').element.value).toBe("0");

        // Find the - button
        const buttons = wrapper.findAll('button');
        const targetButton = buttons.filter(buttonWrapper =>
            buttonWrapper.text().includes('-')
        )[0];

        // Click on the + button
        await targetButton?.trigger('click');

        // Check the value added 5 units
        expect(wrapper.find('input').element.value).toBe("-5");
    });


    test('decrement past the minValue, results should return min value', async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Number Picker",
                    modelValue: 0,
                    stepIncrement: 15,
                    validationRules: [minValue(-10)]
                }
            }
        );

        // Assert input value is default 0
        expect(wrapper.find('input').element.value).toBe("0");

        // Find the - button
        const buttons = wrapper.findAll('button');
        const targetButton = buttons.filter(buttonWrapper =>
            buttonWrapper.text().includes('-')
        )[0];

        // Click on the + button
        await targetButton?.trigger('click');

        // Check the value has not changed
        expect(wrapper.find('input').element.value).toBe("-10");
    });

    test('decrement by 1 to the min javascript integer value', async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Number Picker",
                    modelValue: -Number.MAX_SAFE_INTEGER + 1,
                    stepIncrement: 1,
                    validationRules: [minValue(-Number.MAX_SAFE_INTEGER)]
                }
            }
        );

        // Assert input value is default 0
        expect(wrapper.find('input').element.value).toBe(`${-Number.MAX_SAFE_INTEGER + 1}`);

        // Find the - button
        const buttons = wrapper.findAll('button');
        const targetButton = buttons.filter(buttonWrapper =>
            buttonWrapper.text().includes('-')
        )[0];

        // Click on the + button
        await targetButton?.trigger('click');

        // Check the value has not changed
        expect(wrapper.find('input').element.value).toBe(`${-Number.MAX_SAFE_INTEGER}`);
    });


    test('decrement by 10 PAST the min javascript integer value', async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Number Picker",
                    modelValue: -Number.MAX_SAFE_INTEGER + 1,
                    stepIncrement: 10,
                    validationRules: [minValue(-Number.MAX_SAFE_INTEGER)]
                }
            }
        );

        // Assert input value is default 0
        expect(wrapper.find('input').element.value).toBe(`${-Number.MAX_SAFE_INTEGER + 1}`);

        // Find the - button
        const buttons = wrapper.findAll('button');
        const targetButton = buttons.filter(buttonWrapper =>
            buttonWrapper.text().includes('-')
        )[0];

        // Click on the - button
        await targetButton?.trigger('click');

        // Check the value has not changed
        expect(wrapper.find('input').element.value).toBe(`${-Number.MAX_SAFE_INTEGER}`);
    });

    test('counters decreases from 0 to -1 when decrease is clicked, even with a -1 step increment', async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Number Picker",
                    modelValue: 0,
                    stepIncrement: -1,
                }
            }
        );

        // Assert input value is default 0
        expect(wrapper.find('input').element.value).toBe("0");

        // Find the - button
        const buttons = wrapper.findAll('button');
        const targetButton = buttons.filter(buttonWrapper =>
            buttonWrapper.text().includes('-')
        )[0];

        // Click on the + button
        await targetButton?.trigger('click');

        // Check the value has not changed
        expect(wrapper.find('input').element.value).toBe("-1");
    });

    test('counters decrease from 10 to 9 when decrease is clicked', async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Number Picker",
                    modelValue: 10,
                }
            }
        );

        // Assert input value is default
        expect(wrapper.find('input').element.value).toBe("10");

        // Find the - button
        const buttons = wrapper.findAll('button');
        const targetButton = buttons.filter(buttonWrapper =>
            buttonWrapper.text().includes('-')
        )[0];

        // Click on the - button
        await targetButton?.trigger('click');

        // Check the value has not changed
        expect(wrapper.find('input').element.value).toBe("9");
    });

    test('counters decreases from 12 to 10 when decrease is clicked, even with a -2 step increment', async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Number Picker",
                    modelValue: 12,
                    stepIncrement: -2,
                }
            }
        );

        // Assert input value is default 0
        expect(wrapper.find('input').element.value).toBe("12");

        // Find the - button
        const buttons = wrapper.findAll('button');
        const targetButton = buttons.filter(buttonWrapper =>
            buttonWrapper.text().includes('-')
        )[0];

        // Click on the - button
        await targetButton?.trigger('click');

        // Check the value has not changed
        expect(wrapper.find('input').element.value).toBe("10");
    });

    test('we can still decrement even when the model value is more than the maximum value. Will instantly pop to maximum number', async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Number Picker",
                    modelValue: 15,
                    validationRules: [maxValue(10)]
                }
            }
        );

        // Assert input value is default 0
        expect(wrapper.find('input').element.value).toBe("15");

        // Find the - button
        const buttons = wrapper.findAll('button');
        const targetButton = buttons.filter(buttonWrapper =>
            buttonWrapper.text().includes('-')
        )[0];

        // Click on the - button
        await targetButton?.trigger('click');

        // Check the value has not changed
        expect(wrapper.find('input').element.value).toBe("10");
    });

    test('manually enter in the value', async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Number Picker",
                }
            }
        );

        // Check the default value
        const input = wrapper.find('input')
        expect(input.element.value).toBe("0");

        // Mutate to 15
        await input.setValue("15");

        // Check the value
        expect(input.element.value).toBe("15");
    });

    test('manually enter the value past the max value, should show a validation error', async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Number Picker",
                    validationRules: [maxValue(10)]
                }
            }
        );

        // Check the default value
        const input = wrapper.find('input')
        expect(input.element.value).toBe("0");

        // Mutate to 15
        await input.setValue("15");

        // Get error message
        const errorMessage = wrapper.findAll(".render-error-message")
        expect(errorMessage.length).toBe(1);
    });

    test('manually enter the value under the min value, should show a validation error', async () => {
        const wrapper = mount(
            WlkNumberInput,
            {
                props: {
                    label: "Number Picker",
                    validationRules: [minValue(-10)],
                }
            }
        );

        // Check the default value
        const input = wrapper.find('input')
        expect(input.element.value).toBe("0");

        // Mutate to 15
        await input.setValue("-15");

        // Get error message
        const errorMessage = wrapper.findAll(".render-error-message")
        expect(errorMessage.length).toBe(1);
    });
});
