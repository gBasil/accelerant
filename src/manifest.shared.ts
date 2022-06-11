import { readdirSync } from 'fs';
import { r } from '../scripts/utils';
import packageJSON from '../package.json';

const sharedManifest: any = {
	name: packageJSON.displayName,
	version: packageJSON.version,
	description: packageJSON.description,
	icons: {
		16: './assets/icon-16.png',
		48: './assets/icon-48.png',
		128: './assets/icon-128.png',
	},
	content_scripts: [
		{
			matches: ['*://www.nitrotype.com/*'],
			js: ['./dist/contentScripts/menu/index.global.js'],
			run_at: 'document_end',
		},
		{
			matches: ['*://www.nitrotype.com/*'],
			js: ['./dist/contentScripts/inject/content.global.js'],
			run_at: 'document_start',
		},
	],
}

const webAccessibleResources = [
	'dist/contentScripts/inject/injected.global.js',
	...readdirSync(r('extension/assets/defaultBanners')).map(
		(file) => `assets/defaultBanners/${file}`
	),
	...readdirSync(r('extension/assets/previews')).map(
		(file) => `assets/previews/${file}`
	),
];

export { webAccessibleResources, sharedManifest };
