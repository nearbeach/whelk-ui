<script setup lang="ts">
import {ref} from "vue";
import WlkFormGroup from "@/components/FormGroup/WlkFormGroup.vue";
import WlkButton from "@/components/Button/WlkButton.vue";
import WlkSelect from "@/components/Select/WlkSelect.vue";
import {required} from "../validation/rules/Required.ts";
import {SelectOptionInterface} from "../types/SelectOptionInterface.ts";

const options = ref<SelectOptionInterface[]>([
	{
		disabled: false,
		label: "First option",
		optGroup: "",
		value: "first",
	},
	{
		disabled: true,
		label: "Second option",
		optGroup: "",
		value: "second",
	},
	{
		disabled: false,
		label: "First option",
		optGroup: "The Pain",
		value: "first",
	},
	{
		disabled: false,
		label: "First option",
		optGroup: "The Pain",
		value: "first",
	},
])

const model = ref("")
const selectRef = ref();

function validate() {
	selectRef.value.checkValidation();
}
</script>

<template>
	<main id="main" aria-labelledby="main-title" role="main">
		<h1 id="main-title">Whelk UI - Local Testing</h1>

		<WlkFormGroup id="test">
			<WlkSelect
				label="Select something"
				:validation-rules="[required()]"
				:options="options"
				v-model="model"
				ref="selectRef"
			></WlkSelect>

		</WlkFormGroup>

		<WlkFormGroup>

		</WlkFormGroup>

		<WlkButton
			class="success"
			id="test-button"
			label="Test Button"
			v-on:click="validate()"
		/>
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
