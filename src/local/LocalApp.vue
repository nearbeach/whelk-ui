<script setup lang="ts">
import TabsComponent from "@/components/TabsComponent/TabsComponent.vue";

</script>

<template>
	<main id="main" aria-labelledby="main-title" role="main">
		<h1 id="main-title">Whelk UI - Local Testing</h1>

		<h2>Tab Component</h2>
		<section id="tab">
			<h3>Basic Tabs</h3>

			<TabsComponent
				:tabList="[
					{label: 'hello world', for: 'hello-world'},
					{label: 'second tab', for: 'second-tab'},
					{label: 'third tab', for: 'third-tab'},
				]"
			>
				<template #hello-world>Hello World tab</template>
				<template #second-tab>Second tab</template>
				<template #third-tab>Third tab</template>
			</TabsComponent>
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
