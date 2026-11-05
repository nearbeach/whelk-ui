<script setup lang="ts">
import { computed, ref } from 'vue';

// Props
const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: '',
    },
    triggerLabel: {
        type: String,
        default: 'More information',
    },
});

// Computed
const tooltipId = computed(() => {
    return `tooltip-${props.id}`;
});

// Ref
const tooltipClass = ref('tooltip');
</script>

<template>
    <div :id="tooltipId" :class="tooltipClass" role="tooltip">
        <p
            v-if="
                props.title !== '' &&
                props.title !== null &&
                props.title !== undefined
            "
            class="tooltip-title"
        >
            {{ props.title }}
        </p>
        <p class="tooltip-message">{{ props.message }}</p>
    </div>

    <button
        type="button"
        class="tooltip-trigger"
        :data-tooltip-target="tooltipId"
        :aria-describedby="tooltipId"
        :aria-label="triggerLabel"
        @mouseenter="tooltipClass = 'tooltip show'"
        @mouseleave="tooltipClass = 'tooltip'"
        @focus="tooltipClass = 'tooltip show'"
        @blur="tooltipClass = 'tooltip'"
        @keydown.esc="tooltipClass = 'tooltip'"
    >
		<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info-icon lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
    </button>
</template>

<style scoped>
.tooltip {
    display: none;
    position: absolute;
    z-index: var(--wlk-z-tip);
    padding: var(--wlk-tip-p-t, var(--wlk-tip-p, 0.25rem)) var(--wlk-tip-p-r, var(--wlk-tip-p, 0.25rem)) var(--wlk-tip-p-b, var(--wlk-tip-p, 0.25rem)) var(--wlk-tip-p-l, var(--wlk-tip-p, 0.25rem));
    background-color: var(--wlk-tip-bg, var(--wlk-bg-light));
    box-shadow: var(--wlk-tip-shadow, var(--wlk-shadow-tip));
    color: var(--wlk-text);
    border-color: var(--wlk-border-color);
    border-width: var(--wlk-bw-t, var(--wlk-bw)) var(--wlk-bw-r, var(--wlk-bw)) var(--wlk-bw-b, var(--wlk-bw)) var(--wlk-bw-l, var(--wlk-bw));
    border-style: var(--wlk-bs-t, var(--wlk-bs)) var(--wlk-bs-r, var(--wlk-bs)) var(--wlk-bs-b, var(--wlk-bs)) var(--wlk-bs-l, var(--wlk-bs));
    border-radius: var(--wlk-tip-r-tl, var(--wlk-r-tl, var(--wlk-r))) var(--wlk-tip-r-tr, var(--wlk-r-tr, var(--wlk-r))) var(--wlk-tip-r-br, var(--wlk-r-br, var(--wlk-r))) var(--wlk-tip-r-bl, var(--wlk-r-bl, var(--wlk-r)));
    transform: translateY(-100%) translateY(-0.5rem);
    max-width: 75vw;

    &.show {
        display: inline-block;
    }

    > .tooltip-title {
        margin: 0 0 var(--wlk-s-1) 0;
        color: var(--wlk-red-3);
    }

    > .tooltip-message {
        font-weight: var(--wlk-fw-light);
        margin: 0;
    }

    @media (--large-screen) {
        max-width: 50vw;
    }
}

.tooltip-trigger {
    display: inline;
    padding: 0;
    border: none;
    background: none;
    box-shadow: none;
    color: inherit;
    font: inherit;
    cursor: help;
}

svg {
    width: 1rem;
    height: 1rem;
    color: var(--wlk-text-muted);
	transform: translateY(0.125rem);
}
</style>
