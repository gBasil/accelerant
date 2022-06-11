import { onMessage } from 'webext-bridge';
import browser from 'webextension-polyfill';
import { getSetting } from '~/helpers/settings';
import { dataURItoBlob, getFromDB, saveToDB } from '~/helpers/files';
import buildTrack from '~/helpers/buildTrack';

enum RuleID {
	CustomBanner = 1,
	AdBlock = 2,
	BugBlock = 3,
}

const openMenu = () =>
	browser.tabs.create({
		url: 'https://www.nitrotype.com/accelerant',
	});

// Open the menu on extension install or when icon clicked.
if (process.env.MANIFEST_VERSION === '2')
	browser.browserAction.onClicked.addListener(openMenu);
else if (process.env.MANIFEST_VERSION === '3')
	browser.action.onClicked.addListener(openMenu);

// Open the menu on first install
browser.runtime.onInstalled.addListener((e) => {
	if (e.reason === 'install') openMenu();
});

// Custom track variable
let racetrack: ArrayBuffer;

// If stored, get and set the custom racetrack
(async () => {
	const track = await getFromDB('racetrack');
	if (track) racetrack = await (await dataURItoBlob(track)).arrayBuffer();
})();

// Let the content script upload and retrieve banners
onMessage(
	'upload-banner',
	async ({ data }) => await saveToDB(data.key, data.data)
);

onMessage('get-banner', async ({ data }) => {
	const banner = await getFromDB(data.key);
	if (!banner) return null;

	return banner;
});

// In Manifest V3, (aka Chrome) build the racetrack in the content script
if (process.env.MANIFEST_VERSION === '3')
	onMessage('mv3-upload-racetrack', async ({ data }) => {
		try {
			// Respond with our custom racetrack. Redirects via this API work.
			(browser as any).declarativeNetRequest.updateDynamicRules({
				addRules: [
					{
						id: RuleID.CustomBanner,
						priority: 1,
						action: {
							type: 'redirect',
							redirect: {
								url: data,
							},
						},
						condition: {
							urlFilter:
								'www.nitrotype.com/assets/tracks/speedway/default.png',
							resourceTypes: ['image'],
						},
					},
				],
				removeRuleIds: [RuleID.CustomBanner],
			});
		} catch (e) {
			// Probably an "Out of storage" error, if it happens
			console.error(e);
		}
	});

// In Manifest V2, (aka Firefox) build the racetrack in the background script,
// as ImageData seems to be perpetually tainted in the content script
if (process.env.MANIFEST_VERSION === '2') {
	onMessage('mv2-rebuild-racetrack', async () => {
		const track = await buildTrack();
		racetrack = await (await dataURItoBlob(track)).arrayBuffer();
		saveToDB('racetrack', track);
	});

	// Overwrite the image request
	browser.webRequest.onBeforeRequest.addListener(
		(details) => {
			// Make sure we're only returning the modified image if it's requested on the right page.
			if (
				!racetrack ||
				!details.documentUrl ||
				new URL(details.documentUrl).hostname !== 'www.nitrotype.com' ||
				!new URL(details.documentUrl).pathname.startsWith('/race')
			)
				return;

			const request = browser.webRequest.filterResponseData(
				details.requestId
			);
			request.onstart = () => {
				request.write(racetrack);
				request.disconnect();
			};
		},
		{
			urls: [
				'https://www.nitrotype.com/assets/tracks/speedway/default.png*',
			],
		},
		['requestBody', 'blocking']
	);
}

// Request blocking (adblock & bug report blocking, as they might get errors caused by
// this extension. It's unlikely, but still. I don't want to bother them.)
if (process.env.MANIFEST_VERSION === '3') {
	(browser as any).declarativeNetRequest.updateDynamicRules({
		addRules: [
			{
				id: RuleID.BugBlock,
				priority: 1,
				action: {
					type: 'block',
				},
				condition: {
					initiatorDomains: ['www.nitrotype.com'],
					urlFilter: '*.bugsnag.com',
					resourceTypes: ['script'],
				},
			},
		],
	});
	const updateAdblock = async () =>
		(browser as any).declarativeNetRequest.updateDynamicRules({
			addRules: await getSetting('adblock') ? [
				{
					id: RuleID.AdBlock,
					priority: 1,
					action: {
						type: 'block',
					},
					condition: {
						initiatorDomains: ['www.nitrotype.com'],
						requestDomains: [
							'googletagmanager.com',
							'google-analytics.com',
							'doubleclick.net',
							'cdn.vuukle.com',
							'dsh7ky7308k4b.cloudfront.net',
							'global.proper.io',
							'btloader.com',
							'cdn.intergient.com',
							'facebook.com',
							'facebook.net',
							'quantserve.com',
							'qualaroo.com',
						],
						resourceTypes: ['script', 'main_frame'],
					},
				},
			] : [],
			removeRuleIds: [RuleID.AdBlock],
		});

	onMessage('mv3-update-adblock', updateAdblock);
	updateAdblock();
} else if (process.env.MANIFEST_VERSION === '2') {
	browser.webRequest.onBeforeRequest.addListener(
		(details) => {
			if (
				details.originUrl &&
				new URL(details.originUrl).hostname === 'www.nitrotype.com'
			)
				return { cancel: true };
			return {};
		},
		{
			urls: ['*://notify.bugsnag.com/*'],
		},
		['blocking']
	);

	browser.webRequest.onBeforeRequest.addListener(
		async (details) => {
			if (
				details.originUrl &&
				new URL(details.originUrl).hostname === 'www.nitrotype.com' &&
				(await getSetting('adblock'))
			)
				return { cancel: true };
			return {};
		},
		{
			urls: [
				'*://www.googletagmanager.com/*',
				'*://www.google-analytics.com/*',
				'*://securepubads.g.doubleclick.net/*',
				'*://cdn.vuukle.com/*',
				'*://dsh7ky7308k4b.cloudfront.net/*',
				'*://global.proper.io/*',
				'*://btloader.com/*',
				'*://cdn.intergient.com/*',
				'*://*.facebook.com/*',
				'*://*.facebook.net/*',
				'*://*.quantserve.com/*',
				'*://*.qualaroo.com/*',
			],
		},
		['blocking']
	);
}
