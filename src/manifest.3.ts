import { sharedManifest, webAccessibleResources } from './manifest.shared';

export async function getManifest() {
	const manifest = {
		...sharedManifest,
		manifest_version: 3,
		action: {
			default_icon: {
				16: './assets/icon-16.png',
				48: './assets/icon-48.png',
				128: './assets/icon-128.png',
			},
		},
		background: {
			service_worker: './dist/background/index.global.js',
		},
		permissions: [
			'storage',
			'declarativeNetRequest',
		],
		host_permissions: ['https://*.nitrotype.com/*'],
		web_accessible_resources: [
			{
				resources: webAccessibleResources,
				matches: ['https://www.nitrotype.com/*'],
			},
		],
	};

	return manifest;
}
