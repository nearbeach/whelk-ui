<script setup lang="ts">
import WlkTabs from "@/components/Tabs/WlkTabs.vue";
import {TabHeaderInterface, WlkTextArea} from "@";
import {ref} from "vue";

const tabList : TabHeaderInterface[] = [
    {label: 'First tab', for: 'tab1'},
    {label: 'Second tab', for: 'tab2'},
    {label: 'Third tab', for: 'tab3'},
    {label: 'Fourth tab', for: 'tab4'},
]

const model = ref('');
</script>

<template>
	<main id="main" aria-labelledby="main-title" role="main">
        <h1 id="main-title">Local App</h1>
        <WlkTabs :tab-list="tabList">
            <template #tab1>The first tab</template>
            <template #tab2>The Second tab</template>
            <template #tab3>The Thuir tab</template>
            <template #tab4>The firstdfasdfasdf tab</template>
        </WlkTabs>

        <WlkTextArea label="Text Area" v-model="model" />
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
