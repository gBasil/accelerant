import { getSetting } from '~/helpers/settings';
import { InjectedSettings } from './injected';
import adblock from './scripts/adblock';
import displayTweaks from './scripts/displayTweaks';
import theme from './scripts/theme';
import browser from 'webextension-polyfill';

// Inject another script
(async () => {
	const script = document.createElement('script');
	script.src = browser.runtime.getURL(
		'dist/contentScripts/inject/injected.global.js'
	);
	// Since the injected script won't have access to `browser`, we pass in some prefetched settings
	const settings: InjectedSettings = {
		enablePerfectNitros: await getSetting('enablePerfectNitros'),
		colorPerfectNitros: await getSetting('colorPerfectNitros'),
		enableCarIcon: await getSetting('enableCarIcon')
	};
	script.setAttribute('data-settings', JSON.stringify(settings));
	script.onload = () => script.remove();
	(document.head || document.documentElement).appendChild(script);
})();

// Adblocker
adblock();

// Settings under the "Display" category
displayTweaks();

// Theming
theme();
