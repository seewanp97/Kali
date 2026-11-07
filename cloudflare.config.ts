import { defineConfig } from "cf/config";
import * as entrypoint from "./worker.js" with { type: "cf-worker" };

export default defineConfig({
	worker: {
		name: "kali",
		compatibilityDate: "2026-11-04",
		entrypoint,
	},
});
