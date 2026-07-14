<script setup lang="ts">
import {ref} from "vue";
import WlkDatetime from "@/components/Datetime/WlkDatetime.vue";
import {WlkFileUpload} from "../components/FileUpload";
import {WlkMultiSelect} from "../components/MultiSelect";
import {SelectOptionInterface, WlkSelect} from "@";

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
const resultsModel = ref<SelectOptionInterface[]>([]);
const singleModel = ref('');
const searchModel = ref('');
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
			v-model="singleModel"
			v-on:change="applyStatus"
		/>

		<WlkMultiSelect
			label="Please select a fruit"
			optionsLabel="fruit"
			optionsValue="orchard"
			:options="defaultOptions"
			:status="status"
			v-model:results-model="resultsModel"
			v-model:search-model="searchModel"
			v-on:change="applyStatus"
		/>

		<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software including versions of Lorem Ipsum.
			Why do we use it?

			It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

			Where does it come from?

			Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

			The standard chunk of Lorem Ipsum used since 1966 is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
		</p>
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
