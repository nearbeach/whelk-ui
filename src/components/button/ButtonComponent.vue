<script setup lang="ts">
</script>

<template>
    <button>
	    Hello World
    </button>
</template>

<style scoped>
button {
    padding: 0.5rem 1rem;
    border: var(--border);
    border-radius: var(--border-radius);
    border-width: var(--border-width);
    border-style: var(--border-style);
    color: var(--text);

	&.compact {
		padding: 0.25rem 0.125rem;
		font-size: 0.75rem;
		line-height: 1rem;
	}

	&.tiny {
		padding: 0.125rem 0rem;
		font-size: 0.75rem;
		line-height: 0.75rem;
	}

    &.primary {
        background-color: var(--primary);
        border-color: var(--primary);

        &:hover {
            &:enabled {
                background-color: var(--primary-hover);
            }
        }
    }

    &.secondary {
        background-color: var(--secondary);
        border-color: var(--secondary);

        &:hover {
            &:enabled {
                background-color: var(--secondary-hover);
            }
        }
    }

    &.danger {
        background-color: var(--danger);
        border-color: var(--danger);

        &:hover {
            &:enabled {
                background-color: var(--danger-hover);
            }
        }
    }

    &.warning {
        background-color: var(--warning);
        border-color: var(--warning);

        &:hover {
            &:enabled {
                background-color: var(--warning-hover);
            }
        }
    }

    &.success {
        background-color: var(--success);
        border-color: var(--success);

        &:hover {
            &:enabled {
                background-color: var(--success-hover);
            }
        }
    }

    &.info {
        background-color: var(--info);
        border-color: var(--info);

        &:hover {
            &:enabled {
                background-color: var(--info-hover);
            }
        }
    }

    &.loading {
        animation: loading-animation 1s infinite linear;
    }
}

@keyframes loading-animation {
    0% {
        color: var(--text);
    }
    50% {
        color: var(--text-muted);
    }
    100% {
        color: var(--text);
    }
}
</style>
