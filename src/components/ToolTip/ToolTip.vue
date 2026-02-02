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
        <Info />
    </span>
</template>

<style scoped>
.tooltip {
    display: none;
    position: absolute;
    z-index: 10;
    padding: 0.75rem 0.25rem;
    background-color: var(--wlk-bg-dark);
    border-color: var(--wlk-border-color-muted);
    border-width: var(--wlk-border-color-width);
    border-style: var(--wlk-border-style);
    border-radius: var(--wlk-border-color-radius);
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
        color: var(--wlk-text-muted);
    }

    @media (--large-screen) {
        max-width: 50vw;
    }
}

svg {
    width: 1rem;
    height: 1rem;
    color: var(--wlk-text-muted);
}
</style>
