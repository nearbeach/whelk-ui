<script setup lang="ts">
import {ref} from "vue";
import WlkSelect from "@/components/Select/WlkSelect.vue";

const defaultOptions = [
	{"fruit": "apple", "orchard": "apple", optGroup: "tree"},
	{"fruit": "pineapple", "orchard": "pineapple"},
	{"fruit": "banana", "orchard": "banana", optGroup: "tree"},
	{"fruit": "peach", "orchard": "peach"},
	{"fruit": "grape", "orchard": "grape", disabled: true},
	{"fruit": "milk", "orchard": "milk", optGroup: "cow"},
]

const model = ref('');
</script>

<template>
	<main id="main" aria-labelledby="main-title" role="main">
        <h1 id="main-title">Local App</h1>
		<WlkSelect
			label="Please select a fruit"
			optionsLabel="fruit"
			optionsValue="orchard"
			:options="defaultOptions"
			v-model="model"
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
