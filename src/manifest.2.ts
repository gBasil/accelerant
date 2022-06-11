import { sharedManifest, webAccessibleResources } from './manifest.shared';

export async function getManifest() {
	const manifest = {
		...sharedManifest,
		manifest_version: 2,
		browser_action: {
			16: './assets/icon-16.png',
			48: './assets/icon-48.png',
			128: './assets/icon-128.png',
		},
		background: {
			scripts: ['./dist/background/index.global.js'],
			persistent: false,
		},
		permissions: [
			'storage',
			'webRequest',
			'webRequestBlocking',
			'https://*/',
		],
		web_accessible_resources: webAccessibleResources
	};

	return manifest;
}
