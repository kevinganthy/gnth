import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => ({
	plugins: [sveltekit()],
	resolve: {
		conditions: mode === 'test' ? ['browser'] : []
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		coverage: {
			provider: 'istanbul',
			include: ['src/lib/**/*.{js,ts,svelte}'],
			reporter: ['html', 'text']
		}
		// setupFiles: ['./vitest-setup.js'],
	}
}));
