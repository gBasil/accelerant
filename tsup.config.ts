import { defineConfig } from 'tsup';
import { isDev, r } from './scripts/utils';
import AutoImport from 'unplugin-auto-import/esbuild';

export default defineConfig({
	outDir: 'extension/dist',
	entry: {
		'background/index': './src/background/main.ts',
		'contentScripts/inject/content':
			'./src/contentScripts/inject/content.ts',
		'contentScripts/inject/injected':
			'./src/contentScripts/inject/injected.ts',
	},
	format: ['iife'],
	splitting: false,
	sourcemap: isDev ? 'inline' : false,
	define: {
		__DEV__: JSON.stringify(isDev),
		'process.env.NODE_ENV': isDev ? '"production"' : '"development"',
		'process.env.MANIFEST_VERSION': JSON.stringify(
			process.env.MANIFEST_VERSION
		),
	},
	watch: isDev ? ['src/**/*'] : false,
	minifyWhitespace: !isDev,
	minifySyntax: !isDev,
	target: ['chrome58', 'firefox57'],
	esbuildPlugins: [
		AutoImport({
			imports: [
				{
					'webextension-polyfill': [['default', 'browser']],
				},
			],
			dts: r('src/auto-imports.d.ts'),
		}),
	],
});
