import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.js";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      globals: true,
      restoreMocks: true,
      clearMocks: true,
      mockReset: true,
      setupFiles: ["./vitest.setup.ts"],
    },
  })
);
