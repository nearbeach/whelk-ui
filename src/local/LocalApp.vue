<script setup lang="ts">
import {ref} from "vue";
import WlkSelect from "@/components/Select/WlkSelect.vue";
import WlkDate from "@/components/Date/WlkDate.vue";
import WlkTime from "@/components/Time/WlkTime.vue";
import WlkDatetime from "@/components/Datetime/WlkDatetime.vue";
import {
	WlkButton,
	WlkDropDown,
	WlkDropDownItem,
	WlkDropDownSeparator,
	WlkModal,
	WlkModalFooter,
	WlkModalHeader
} from "../components";
import {WlkFileUpload} from "@/components/FileUpload";

const defaultOptions = [
	{"fruit": "apple", "orchard": "apple", optGroup: "tree"},
	{"fruit": "pineapple", "orchard": "pineapple"},
	{"fruit": "banana", "orchard": "banana", optGroup: "tree"},
	{"fruit": "peach", "orchard": "peach"},
	{"fruit": "grape", "orchard": "grape", disabled: true},
	{"fruit": "milk", "orchard": "milk", optGroup: "cow"},
]

const model = ref('');
const fileModel = ref<FileList>();
const dateModel = ref(null);
const timeModel = ref("08:34");
const datetimeModel = ref("Thu Jan 01 1970 00:00:00");
const status = ref("");

function applyStatus() {
	status.value = "Hello, making change";

	setTimeout(() => {
		status.value = "";
	}, 5000);
}

function openModal() {
	// ADD CODE
}

function pain() {
	console.log("PAIN!");
}

function uploadFile() {
	console.log("File Model: ", fileModel.value);

	// Checks
	if (fileModel.value === undefined || fileModel.value === null || fileModel.value?.length < 1) {
		// Nothing to do
		return;
	}

	// Send data to backend
	const data_to_send = new FormData();
	data_to_send.append('file', fileModel.value[0]);

	fetch(`/`, {
		method: "POST",
		body: data_to_send,
	})
}
</script>

<template>
	<main id="main" aria-labelledby="main-title" role="main">
        <h1 id="main-title">Local App</h1>
		<wlkFileUpload label="Upload a document"  v-model="fileModel" @change="uploadFile" />

		<div style="display:flex;flex-direction:row;">
			<WlkFileUpload label="Upload a document"  v-model="fileModel" :multiple="true"/>
			<WlkDatetime label="Upload a document"  v-model="dateModel"/>
		</div>

		<WlkSelect
			label="Please select a fruit"
			optionsLabel="fruit"
			optionsValue="orchard"
			:options="defaultOptions"
			:status="status"
			v-model="model"
			v-on:change="applyStatus"
		/>

		<WlkDate
			label="Please select a date"
			v-model="dateModel"
			:status="status"
		/>

		<WlkTime
			label="Please select a time"
			v-model="timeModel"
			:status="status"
		/>

		<WlkDatetime
			:label="`Please pick a date time - ${datetimeModel}`"
			v-model="datetimeModel"
			:status="status"
		/>

		<WlkButton v-on:click="openModal"/>

		<WlkDropDown>
			<template v-slot:button>Push me</template>
			<template v-slot:drop-down-items>
				<WlkDropDownItem v-on:click="pain()">Pain</WlkDropDownItem>
				<WlkDropDownSeparator />
				<WlkDropDownItem>Even</WlkDropDownItem>
				<WlkDropDownItem>More</WlkDropDownItem>
				<WlkDropDownItem>Pain</WlkDropDownItem>
			</template>
		</WlkDropDown>

		<WlkModal class="large">
			<WlkModalHeader>HEADER FUNCTION</WlkModalHeader>
			Hello World
			<WlkModalFooter>FOOTER FUNCTION</WlkModalFooter>
		</WlkModal>
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
