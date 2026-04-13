<script setup lang="ts">
import {ref} from "vue";
import WlkSelect from "@/components/Select/WlkSelect.vue";
import WlkDate from "@/components/Date/WlkDate.vue";
import WlkTime from "@/components/Time/WlkTime.vue";
import WlkDatetime from "@/components/Datetime/WlkDatetime.vue";

const defaultOptions = [
	{"fruit": "apple", "orchard": "apple", optGroup: "tree"},
	{"fruit": "pineapple", "orchard": "pineapple"},
	{"fruit": "banana", "orchard": "banana", optGroup: "tree"},
	{"fruit": "peach", "orchard": "peach"},
	{"fruit": "grape", "orchard": "grape", disabled: true},
	{"fruit": "milk", "orchard": "milk", optGroup: "cow"},
]

const model = ref('');
const dateModel = ref("2013-01-29");
const timeModel = ref("08:34");
const datetimeModel = ref("Thu Jan 01 1970 00:00:00");
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

		<WlkDate
			label="Please select a date"
			v-model="dateModel"
		/>

		<WlkTime
			label="Please select a time"
			v-model="timeModel"
		/>

		<WlkDatetime
			:label="`Please pick a date time - ${datetimeModel}`"
			v-model="datetimeModel"
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
