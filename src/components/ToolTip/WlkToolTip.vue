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

    <span
        :data-tooltip-target="tooltipId"
        type="tooltip"
        @mouseenter="tooltipClass = 'tooltip show'"
        @mouseleave="tooltipClass = 'tooltip'"
        @focus="tooltipClass = 'tooltip show'"
        @blur="tooltipClass = 'tooltip'"
        @keydown.esc="tooltipClass = 'tooltip'"
    >
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info-icon lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
    </span>
</template>

<style scoped>
.tooltip {
    display: none;
    position: absolute;
    z-index: 10;
    padding: 0.25rem;
    background-color: var(--wlk-bg-light);
    border-color: var(--wlk-border-color);
    border-width: var(--wlk-border-width);
    border-style: var(--wlk-border-style);
    border-radius: var(--wlk-border-radius);
    transform: translateY(-100%) translateY(-0.5rem);
    max-width: 75vw;

    &.show {
        display: inline-block;
    }

    > .tooltip-title {
        margin: 0 0 0.125rem 0;
        color: var(--wlk-text-red);
    }

    > .tooltip-message {
        font-weight: lighter;
        margin: 0;
    }

    @media (--large-screen) {
        max-width: 50vw;
    }
}

svg {
    width: 1rem;
    height: 1rem;
    color: var(--wlk-text-muted);
	transform: translateY(0.125rem);
}
</style>
