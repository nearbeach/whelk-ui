<script setup lang="ts">
import SelectComponent from "@/components/Select/SelectComponent.vue";
import {ref} from "vue";
import {SelectOptionInterface} from "../utils/interfaces/SelectOptionInterface.ts";

const options = ref<SelectOptionInterface[]>([
	{disabled: true, label: "Disabled option", value: "disabled", optGroup: ""},
	{disabled: false, label: "Human", value: "Human", optGroup: ""},
	{disabled: false, label: "Cat", value: "Cat", optGroup: "Animal"},
	{disabled: false, label: "Dog", value: "Dog", optGroup: "Animal"},
	{disabled: false, label: "Horse", value: "Horse", optGroup: "Animal"},
])

const model = ref("")
</script>

<template>
	<main id="main" aria-labelledby="main-title" role="main">
		<h1 id="main-title">Whelk UI - Local Testing</h1>

		<h2>Select Component</h2>
		<section id="tab">
			<h3>Select</h3>
			<SelectComponent
				:options="options"
				label="Select Single Option"
				v-model="model"
			 />

		</section>
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
