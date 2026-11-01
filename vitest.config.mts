import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    env: {
      NODE_ENV: "test",
      BUCKET_URL: "http://bucket.test",
    },
  },
});
