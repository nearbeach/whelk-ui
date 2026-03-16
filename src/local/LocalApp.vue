<script setup lang="ts">
import {ref} from "vue";
import WlkFormGroup from "@/components/FormGroup/WlkFormGroup.vue";
import WlkTextInput from "@/components/TextInput/WlkTextInput.vue";
import WlkButton from "@/components/Button/WlkButton.vue";

const model = ref("")
</script>

<template>
	<main id="main" aria-labelledby="main-title" role="main">
		<h1 id="main-title">Whelk UI - Local Testing</h1>

		<WlkFormGroup id="test">
			<WlkTextInput
				id="test-label"
				label="Test Label"
				v-model="model"
			/>
		</WlkFormGroup>

		<WlkFormGroup>
			<WlkTextInput
				:is-required="true"
				:min-length="5"
				:max-length="50"
				label="Text Input"
				model-value="model"
				tooltip-title="Tooltip"
				tooltip-message="Hello World"
			/>
		</WlkFormGroup>

		<WlkButton class="success" id="test-button" label="Test Button" />
	</main>
</template>

<style scoped>
main {
	max-width: 1400px;
	margin: auto;

	section {
		> .code-block {
			width: 100%;

			> textarea {
				width: 100%;
			}
		}
	}
}
</style>
