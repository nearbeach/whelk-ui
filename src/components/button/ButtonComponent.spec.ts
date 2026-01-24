// src/components/button/ButtonComponent.spec.ts
import {describe, test, expect } from "vitest";
import ButtonComponent from "./ButtonComponent.vue";

describe("ButtonComponent", () => {
	test("mount component", async () => {
		// App exists
		expect(ButtonComponent).toBeTruthy();
	});
});

