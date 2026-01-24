<script setup lang="ts">

import ButtonComponent from "./components/button/ButtonComponent.vue";
import {ObjectStateEnum} from "./utils/enums/ObjectStateEnum.ts";
</script>

<template>
    <main id="main" aria-labelledby="main-title" role="main">
	    <ButtonComponent class="primary">Button Text</ButtonComponent>
	    <ButtonComponent class="secondary">Button Text</ButtonComponent>
	    <ButtonComponent :object-state="ObjectStateEnum.LoggingIn"
	                     class="secondary">Button Text</ButtonComponent>
    </main>
</template>

<style scoped>
main {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100dvh;
	background-color: oklch(40.5% 0.101 131.063);

}

</style>
