import { r } from './utils';
import { writeFileSync } from 'fs';

const writeManifest = async () => {
	const { getManifest } = require(r(`src/manifest.${process.env.MANIFEST_VERSION}`));

	writeFileSync(
		r('extension/manifest.json'),
		JSON.stringify(await getManifest())
	);
	console.log('Written manifest.json');
};

// TODO: Get live reloading in dev mode to work
writeManifest();
