import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import WlkFileUpload from './WlkFileUpload.vue';

describe('WlkFileUpload.vue', () => {
    test('renders the component with a label and input', async () => {
        const wrapper = mount(WlkFileUpload, {
            props: {
                label: 'Upload File',
            },
        });

        expect(wrapper.text()).toContain('Upload File');
        expect(wrapper.find('input').exists()).toBe(true);
    });

    // test('emits "isValid" event when a file is uploaded', async () => {
    //     const wrapper = mount(WlkFileUpload, {
    //         props: {
    //             label: 'Upload File',
    //         },
    //     });
    //
    //     const inputElement = wrapper.find('input');
    //     await inputElement.trigger('change', { target: { files: [new File(['content'], 'file.txt')] } });
    //
    //     expect(wrapper.emitted()).toHaveProperty('isValid');
    // });

    // test('renders error message if validation fails', async () => {
    //     const wrapper = mount(WlkFileUpload, {
    //         props: {
    //             label: 'Upload File',
    //             validationRules: [required()],
    //         },
    //     });
    //
    //     const inputElement = wrapper.find('input');
    //     await inputElement.trigger('change', { target: { files: [] } });
    //
    //     expect(wrapper.find('.wlk-render-error-message').text()).toContain('This field is required');
    // });
});