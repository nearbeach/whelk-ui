// composables/getComponentId.ts
import {computed} from "vue";
import { useId } from 'vue'

export function getComponentId(label: string): string {
    const componentId =  computed(() => {
        // Return an id made up of input- + title
        return 'wlk-' + label?.toLowerCase()?.replace(/ /g, '-') + "-" + useId();
    });

    return componentId.value;
}
