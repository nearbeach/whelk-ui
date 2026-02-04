<script setup lang="ts">
import { ref } from "vue";
import ButtonComponent from "@/components/Button/ButtonComponent.vue";
import CheckBox from "@/components/CheckBox/CheckBox.vue";
import DatetimeComponent from "@/components/Datetime/DatetimeComponent.vue";

// Define ref
const datetimeModel = ref("2012-01-01");
</script>

<template>
	<main id="main" aria-labelledby="main-title" role="main">
		<h1 id="main-title">Whelk UI - Local Testing</h1>
		<h2>Buttons</h2>
		<section id="buttons-classes">
			<h3>Classes</h3>
			<div class="result-block">
				<ButtonComponent/>
				<ButtonComponent>No Class Button</ButtonComponent>
				<ButtonComponent class="primary">Primary Button</ButtonComponent>
				<ButtonComponent class="secondary">Secondary Button</ButtonComponent>
				<ButtonComponent class="danger">Danger Button</ButtonComponent>
				<ButtonComponent class="warning">Warning Button</ButtonComponent>
				<ButtonComponent class="success">Success Button</ButtonComponent>
				<ButtonComponent class="info">Info Button</ButtonComponent>
			</div>
			<div class="code-block">
			<textarea rows="10">
<ButtonComponent />
<ButtonComponent>No Class Button</ButtonComponent>
<ButtonComponent class="primary">Primary Button</ButtonComponent>
<ButtonComponent class="secondary">Secondary Button</ButtonComponent>
<ButtonComponent class="danger">Danger Button</ButtonComponent>
<ButtonComponent class="warning">Warning Button</ButtonComponent>
<ButtonComponent class="success">Success Button</ButtonComponent>
<ButtonComponent class="info">Info Button</ButtonComponent>
			</textarea>
			</div>
		</section>

		<section id="buttons-disabled">
			<h3>Disabled</h3>
			<div class="result-block">
				<ButtonComponent :is-disabled="true"/>
				<ButtonComponent :is-disabled="true">No Class Button</ButtonComponent>
				<ButtonComponent :is-disabled="true" class="primary">Primary Button</ButtonComponent>
				<ButtonComponent :is-disabled="true" class="secondary">Secondary Button</ButtonComponent>
				<ButtonComponent :is-disabled="true" class="danger">Danger Button</ButtonComponent>
				<ButtonComponent :is-disabled="true" class="warning">Warning Button</ButtonComponent>
				<ButtonComponent :is-disabled="true" class="success">Success Button</ButtonComponent>
				<ButtonComponent :is-disabled="true" class="info">Info Button</ButtonComponent>
			</div>
			<div class="code-block">
			<textarea rows="10">
<ButtonComponent :is-disabled="true"/>
<ButtonComponent :is-disabled="true">No Class Button</ButtonComponent>
<ButtonComponent :is-disabled="true" class="primary">Primary Button</ButtonComponent>
<ButtonComponent :is-disabled="true" class="secondary">Secondary Button</ButtonComponent>
<ButtonComponent :is-disabled="true" class="danger">Danger Button</ButtonComponent>
<ButtonComponent :is-disabled="true" class="warning">Warning Button</ButtonComponent>
<ButtonComponent :is-disabled="true" class="success">Success Button</ButtonComponent>
<ButtonComponent :is-disabled="true" class="info">Info Button</ButtonComponent>
			</textarea>
			</div>
		</section>

		<section id="buttons-is-action-running">
			<h3>Is Action Running</h3>
			<div class="result-block">
				<ButtonComponent :is-action-running="true"/>
				<ButtonComponent :is-action-running="true">No Class Button</ButtonComponent>
				<ButtonComponent :is-action-running="true" class="primary">Primary Button</ButtonComponent>
				<ButtonComponent :is-action-running="true" class="secondary">Secondary Button</ButtonComponent>
				<ButtonComponent :is-action-running="true" class="danger">Danger Button</ButtonComponent>
				<ButtonComponent :is-action-running="true" class="warning">Warning Button</ButtonComponent>
				<ButtonComponent :is-action-running="true" class="success">Success Button</ButtonComponent>
				<ButtonComponent :is-action-running="true" class="info">Info Button</ButtonComponent>

				<hr/>
				<ButtonComponent :is-action-running="true">No Class Button
					<template #action-state>No Class Update</template>
				</ButtonComponent>
				<ButtonComponent :is-action-running="true" class="primary">Primary Button
					<template #action-state>Primary Update</template>
				</ButtonComponent>
				<ButtonComponent :is-action-running="true" class="secondary">Secondary Button
					<template #action-state>Secondary Update</template>
				</ButtonComponent>
				<ButtonComponent :is-action-running="true" class="danger">Danger Button
					<template #action-state>Danger Update</template>
				</ButtonComponent>
				<ButtonComponent :is-action-running="true" class="warning">Warning Button
					<template #action-state>Warning Update</template>
				</ButtonComponent>
				<ButtonComponent :is-action-running="true" class="success">Success Button
					<template #action-state>Success Update</template>
				</ButtonComponent>
				<ButtonComponent :is-action-running="true" class="Info">Info Button
					<template #action-state>Info Update</template>
				</ButtonComponent>
			</div>
			<div class="code-block">
			<textarea rows="10">
<ButtonComponent :is-action-running="true" />
<ButtonComponent :is-disabled="true">No Class Button</ButtonComponent>
<ButtonComponent :is-disabled="true" class="primary">Primary Button</ButtonComponent>
<ButtonComponent :is-disabled="true" class="secondary">Secondary Button</ButtonComponent>
<ButtonComponent :is-disabled="true" class="danger">Danger Button</ButtonComponent>
<ButtonComponent :is-disabled="true" class="warning">Warning Button</ButtonComponent>
<ButtonComponent :is-disabled="true" class="success">Success Button</ButtonComponent>
<ButtonComponent :is-disabled="true" class="info">Info Button</ButtonComponent>

<ButtonComponent :is-action-running="true">No Class Button
	<template #action-state>No Class Update</template>
</ButtonComponent>
<ButtonComponent :is-action-running="true" class="primary">Primary Button
	<template #action-state>Primary Update</template>
</ButtonComponent>
<ButtonComponent :is-action-running="true" class="secondary">Secondary Button
	<template #action-state>Secondary Update</template>
</ButtonComponent>
<ButtonComponent :is-action-running="true" class="danger">Danger Button
	<template #action-state>Danger Update</template>
</ButtonComponent>
<ButtonComponent :is-action-running="true" class="warning">Warning Button
	<template #action-state>Warning Update</template>
</ButtonComponent>
<ButtonComponent :is-action-running="true" class="success">Success Button
	<template #action-state>Success Update</template>
</ButtonComponent>
<ButtonComponent :is-action-running="true" class="Info">Info Button
	<template #action-state>Info Update</template>
</ButtonComponent>
			</textarea>
			</div>
		</section>

		<h1>Check Box</h1>
		<section id="checkbox">
			<h3>Basic Checkbox</h3>
			<CheckBox id="pizza" label="Pizza Checkbox" />
			<div class="code-block">
				<textarea rows="10">
<CheckBox id="pizza" label="Pizza Checkbox" />
				</textarea>
			</div>

		</section>

		<h1>Datetime Component</h1>
		<section id="checkbox">
			<h3>Basic Checkbox</h3>
			<DatetimeComponent
				label="Start Date"
				v-model="datetimeModel"
			/>
			<div class="code-block">
				<textarea rows="10">
<CheckBox id="pizza" label="Pizza Checkbox" />
				</textarea>
			</div>

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
