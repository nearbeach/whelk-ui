<script setup lang="ts">
import {computed} from "vue";
import ToolTip from "@/components/ToolTip/WlkToolTip.vue";
import WlkFormGroup from "@/components/FormGroup/WlkFormGroup.vue";

// Define props
const props = defineProps({
	label: {
		type: String,
		required: true,
	},
	offText: {
		type: String,
		required: false,
		default: "",
	},
	onText: {
		type: String,
		required: false,
		default: "",
	},
	tooltipMessage: {
		type: String,
		required: false,
		default: '',
	},
	tooltipTitle: {
		type: String,
		required: false,
		default: '',
	},
})

// Define computed
const getClass = computed(() => {
	return model.value ? "switch on" : "switch off";
});

const getId = computed(() => {
	// Return an id made up of input- + title
	return 'input-' + props.label?.toLowerCase()?.replace(/ /g, '-');
});

const getText = computed(() => {
	return model.value ? props.onText : props.offText;
});

// Define model
const model = defineModel({
	type: Boolean
});

// Define functions
function switchClicked() {
	model.value = !model.value;
}
</script>

<template>

	<WlkFormGroup class="switch">
		<label :for="getId">
			<ToolTip
				v-if="props.tooltipMessage !== ''"
				:title="tooltipTitle"
				:message="tooltipMessage"
				:id="getId"
			/>
            {{label}}
		</label>
		<button
			type="button"
			role="switch"
			:id="getId"
			:aria-checked="model ? 'true' : 'false'"
			v-on:click="switchClicked"
			:class="getClass"
		>
			<span class="switch-text">{{ getText }}</span>
			<span class="switch-block"></span>
		</button>
	</WlkFormGroup>
</template>

<style scoped>
.switch {
	width: 100%;

	> .switch {
		display: grid;
		grid-template-columns: [on] 2rem [text] minmax(0, 1fr) [off] 2rem;
		padding: 0;
		background: none;
		color: inherit;
		font: inherit;
		cursor: pointer;
		border-style: var(--wlk-bs-t, var(--wlk-bs)) var(--wlk-bs-r, var(--wlk-bs)) var(--wlk-bs-b, var(--wlk-bs)) var(--wlk-bs-l, var(--wlk-bs));
		border-width: var(--wlk-bw-t, var(--wlk-bw)) var(--wlk-bw-r, var(--wlk-bw)) var(--wlk-bw-b, var(--wlk-bw)) var(--wlk-bw-l, var(--wlk-bw));
		border-radius: var(--wlk-switch-r-tl, var(--wlk-r-tl, var(--wlk-r))) var(--wlk-switch-r-tr, var(--wlk-r-tr, var(--wlk-r))) var(--wlk-switch-r-br, var(--wlk-r-br, var(--wlk-r))) var(--wlk-switch-r-bl, var(--wlk-r-bl, var(--wlk-r)));
		border-color: var(--wlk-border-color);
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;

		> .switch-block {
			width: 2rem;
			height: 2rem;
			display: block;
		}

		> .switch-text {
			display: grid;
			grid-area: text;
			text-align: center;
			align-items: center;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		&.on {
			> .switch-block {
				grid-area: on;
				background-color: var(--wlk-success);
			}
		}

		&.off {
			> .switch-block {
				grid-area: off;
				background-color: var(--wlk-info);
			}
		}
	}

	&.compact {
		> label {
			font-size: 1rem;
			line-height: 1.25rem;
		}

		> .switch {

			grid-template-columns: [on] 1rem [text] minmax(0, 1fr) [off] 1rem;

			> .switch-block {
				width: 1rem;
				height: 1rem;
			}

			> .switch-text {
				font-size: 0.75rem;
				line-height: 1rem;
			}
		}
	}
}

</style>