import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 18800,
		strictPort: true,
		fs: {
			// Allow serving files from the library package
			allow: ['..']
		}
	},
	preview: {
		port: 18800,
		strictPort: true
	},
	ssr: {
		noExternal: ['@keenmate/web-grid']
	}
});
