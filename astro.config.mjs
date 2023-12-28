import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import solidJs from "@astrojs/solid-js";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [tailwind(), solidJs(), react()],
  adapter: vercel()
});