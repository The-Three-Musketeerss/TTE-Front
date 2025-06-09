import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tailwindcss(), react(), tsconfigPaths(), sentryVitePlugin({
    org: "miguel-jaramillo",
    project: "javascript-react",
    authToken: process.env.SENTRY_AUTH_TOKEN,
  })],

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    coverage: {
      provider: "v8",
      reportsDirectory: "coverage",
      reporter: ["text", "html", "lcov"],
      exclude: [
        "**/test/**",
        "**/*.test.tsx",
        "**/*.test.ts",
        "**/pages/ForgotPassword/**",
        "**/pages/Landing/**",
        "**/pages/NotFound/**",
        "**/pages/SignUp/**",
        "**/pages/Login/**",
        "**/pages/Homepage/**",
        "**/components/CheckoutSummary/**",
        "**/eslint.config.js",
        "**/vite.config.ts",
        "**/vite-env.d.ts",
        "**/main.tsx",
        "**/main.ts",
        "**/preview.ts",
        "**/services/**",
        "**/types.ts",
        "**/Skeleton/**",
        "**/*resolver*.tsx",
        "**/*resolver*.ts",
        "**/components/Checkout/CheckoutSummary/**",
        "**/components/shared/Footer/**",
        "**/components/cart/Shipping/**",
        "**/components/ProductDetail/ProductDetailSkeleton.tsx",
        "**/hooks/**",
        "**/*.stories.*",
        ".storybook/**",
        "**/components/shared/BaseInput/**",
        "**/__mocks__/**"
      ],
    },
  },

  build: {
    sourcemap: true
  }
});