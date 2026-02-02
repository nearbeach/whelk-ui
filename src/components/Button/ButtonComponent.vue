<script setup lang="ts">
import { computed, defineProps } from 'vue';

// Define props
const props = defineProps({
	isActionRunning: {
		type: Boolean,
		default: false,
		required: false,
	},
	isDisabled: {
		type: Boolean,
		default: false,
		required: false,
	},
});

// Define computed
const buttonIsDisabled = computed(() => {
	return props.isDisabled || props.isActionRunning;
});
</script>

<template>
	<button
		class="wlk-button-component"
		role="button"
		:disabled="buttonIsDisabled"
	>
		<slot
			v-if="!isActionRunning"
		>Submit</slot>
		<slot
			v-if="isActionRunning"
			name="action-state"
		>Updating</slot>
	</button>
</template>

<style scoped>
.wlk-button-component {
	padding: 0.5rem 1rem;
	border: var(--wlk-border-color);
	border-radius: var(--wlk-border-radius);
	border-width: var(--wlk-border-width);
	border-style: var(--wlk-border-style);
	color: var(--wlk-text);

	&:disabled {
		color: color-mix(in srgb, var(--wlk-text), #0000 var(--wlk-text-opacity));
	}

	&.compact {
		padding: 0.25rem 0.125rem;
		font-size: 0.75rem;
		line-height: 1rem;
	}

	&.tiny {
		padding: 0.125rem 0;
		font-size: 0.75rem;
		line-height: 0.75rem;
	}

	&.primary {
		background-color: var(--wlk-primary);
		border-color: var(--wlk-primary);

		&:hover {
			&:enabled {
				background-color: var(--wlk-primary-hover);
			}
		}

		&:disabled {
			background-color: color-mix(in srgb, var(--wlk-primary), #0000 var(--wlk-text-opacity));
		}
	}

	&.secondary {
		background-color: var(--wlk-secondary);
		border-color: var(--wlk-secondary);

		&:hover {
			&:enabled {
				background-color: var(--wlk-secondary-hover);
			}
		}

		&:disabled {
			background-color: color-mix(in srgb, var(--wlk-secondary), #0000 var(--wlk-text-opacity));
		}
	}

	&.danger {
		background-color: var(--wlk-danger);
		border-color: var(--wlk-danger);

		&:hover {
			&:enabled {
				background-color: var(--wlk-danger-hover);
			}
		}

		&:disabled {
			background-color: color-mix(in srgb, var(--wlk-danger), #0000 var(--wlk-text-opacity));
		}
	}

	&.warning {
		background-color: var(--wlk-warning);
		border-color: var(--wlk-warning);

		&:hover {
			&:enabled {
				background-color: var(--wlk-warning-hover);
			}
		}

		&:disabled {
			background-color: color-mix(in srgb, var(--wlk-warning), #0000 var(--wlk-text-opacity));
		}
	}

	&.success {
		background-color: var(--wlk-success);
		border-color: var(--wlk-success);

		&:hover {
			&:enabled {
				background-color: var(--wlk-success-hover);
			}
		}

		&:disabled {
			background-color: color-mix(in srgb, var(--wlk-success), #0000 var(--wlk-text-opacity));
		}
	}

	&.info {
		background-color: var(--wlk-info);
		border-color: var(--wlk-info);

		&:hover {
			&:enabled {
				background-color: var(--wlk-info-hover);
			}
		}

		&:disabled {
			background-color: color-mix(in srgb, var(--wlk-info), #0000 var(--wlk-text-opacity));
		}
	}
}
</style>
