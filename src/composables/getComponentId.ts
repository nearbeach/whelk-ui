// composables/getComponentId.ts
import {computed} from "vue";

export function getComponentId(label: string): string {
    const componentId =  computed(() => {
        // Return an id made up of input- + title
        return 'select-' + label?.toLowerCase()?.replace(/ /g, '-');
    });

    return componentId.value;
}
