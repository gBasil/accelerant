import { defineConfig } from 'vite';
import { r, isDev } from './scripts/utils';
import packageJSON from './package.json';
import AutoImport from 'unplugin-auto-import/vite';
import react from '@vitejs/plugin-react';

// Bundling the content script via Vite
export default defineConfig({
	root: r('src'),
	resolve: {
		alias: {
			'~/': `${r('src')}/`,
		},
	},
	define: {
		__DEV__: isDev,
		'process.env.MANIFEST_VERSION': JSON.stringify(
			process.env.MANIFEST_VERSION
		),
	},
	plugins: [
		react({ fastRefresh: false }),
		AutoImport({
			imports: [
				{
					'webextension-polyfill': [['default', 'browser']],
				},
			],
			dts: r('src/auto-imports.d.ts'),
		}),
	],
	optimizeDeps: {
		include: ['webextension-polyfill'],
	},
	build: {
		watch: isDev
			? {
					include: [
						r('src/contentScripts/menu/**/*'),
						r('src/contentScripts/inject/scripts/**/*.ts'),
						r('src/contentScripts/inject/postLoad.ts'),
					],
			  }
			: undefined,
		outDir: r('extension/dist/contentScripts/menu'),
		cssCodeSplit: false,
		emptyOutDir: false,
		minify: !isDev,
		sourcemap: isDev ? 'inline' : false,
		lib: {
			entry: r('src/contentScripts/menu/index.tsx'),
			name: packageJSON.name,
			formats: ['iife'],
		},
		rollupOptions: {
			output: {
				entryFileNames: 'index.global.js',
				extend: true,
			},
		},
	},
});
