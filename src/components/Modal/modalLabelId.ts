import type {InjectionKey} from 'vue';

// Lets WlkModalHeader give the dialog its accessible name
export const modalLabelIdKey: InjectionKey<string> = Symbol('wlk-modal-label-id');
