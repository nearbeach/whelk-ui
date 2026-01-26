<template>
	<div class="dev-container">
		<h1>Whelk UI Development</h1>

		<section>
			<h2>Button Component</h2>
			<div class="button-group">
				<ButtonComponent variant="primary" @click="handleClick">
					Primary Button
				</ButtonComponent>

				<ButtonComponent variant="secondary" @click="handleClick">
					Secondary Button
				</ButtonComponent>

				<ButtonComponent variant="outline" @click="handleClick">
					Outline Button
				</ButtonComponent>

				<ButtonComponent variant="primary" disabled>
					Disabled Button
				</ButtonComponent>
			</div>
		</section>

		<div v-if="clickCount > 0" class="click-info">
			Button clicked {{ clickCount }} times
		</div>
	</div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {ButtonComponent} from '../src/components'

const clickCount = ref(0)

const handleClick = () => {
	clickCount.value++
}
</script>

<style scoped>
.dev-container {
	max-width: 1200px;
	margin: 0 auto;
	padding: 2rem;
	font-family: system-ui, -apple-system, sans-serif;
}

h1 {
	color: #2c3e50;
	margin-bottom: 2rem;
}

section {
	margin-bottom: 2rem;
	padding: 1.5rem;
	border: 1px solid #e0e0e0;
	border-radius: 0.5rem;
}

.button-group {
	display: flex;
	gap: 1rem;
	flex-wrap: wrap;
}

.click-info {
	margin-top: 1rem;
	padding: 1rem;
	background-color: #f0f0f0;
	border-radius: 0.25rem;
}
</style>