// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.fusho-takahashi.me',
  output: 'static',
  build: {
    assets: 'assets'
  }
});
