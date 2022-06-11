import { useEffect, useState } from 'react';
import browser from 'webextension-polyfill';

// Default value for the setting, if it's unset
const defaultSettings = {
	adblock: true,
	showGitHubButton: true,
	hideSeason: false,
	hideFooter: false,
	hideBuyCash: false,
	hideChat: false,
	hideTypingFlag: false,
	hideSoundControls: false,
	hideNotifications: false,
	hideAchievements: false,
	hideIndicators: false,
	hideAlternateLogins: false,
	hideAccountDropdown: false,

	// Banners
	shownBanners: [],

	// Colors
	colorBackground: '#000000',
	overrideColorBackground: false,
	colorForeground: '#ffffff',
	overrideColorForeground: false,
	colorForegroundActive: '#000000',
	overrideColorForegroundActive: false,
	colorForegroundTyped: '#5B5B5B',
	overrideColorForegroundTyped: false,
	colorBackgroundActive: '#ffffff',
	overrideColorBackgroundActive: false,
	colorBackgroundIncorrect: '#ff0000',
	overrideColorBackgroundIncorrect: false,

	// Tweaks
	colorPerfectNitros: '#7bb6ff',
	enablePerfectNitros: false,
	enableCarIcon: false,
	sessionStats: false,
};
// The value to return before we fetch the actual value
const defaults = {
	boolean: false,
	string: '',
	number: 0,
};

type Settings = typeof defaultSettings;

/**
 * Get the value of a setting. If it doesn't exist, set it to the default
 * @param key Setting key. To create a new setting, configure the `defaultSettings` object
 */
const getSetting = async (baseKey: keyof Settings, dontSetDefault?: true) => {
	const key = `setting/${baseKey}`;
	const setting = await browser.storage.local.get(key);
	if (setting[key] === undefined && dontSetDefault === undefined) {
		await browser.storage.local.set({ [key]: defaultSettings[baseKey] });
		return defaultSettings[baseKey];
	}

	return setting[key];
};

/**
 * Set the value of a setting
 * @param key Setting key. To create a new setting, configure the `defaultSettings` object
 * @param value The new value
 */
const setSetting = async (key: keyof Settings, value: any) => {
	await browser.storage.local.set({
		[`setting/${key}`]: value,
	});

	return;
};

const useSetting = (key: keyof Settings, deps?: any[]) => {
	const [settingState, setSettingState] = useState(
		// @ts-ignore
		defaults[typeof defaultSettings[key]]
	);

	useEffect(() => {
		getSetting(key).then(setSettingState);
		// eslint-disable-next-line
	}, [key, ...(deps || [])]);

	const updateSetting = (val: any) => {
		setSettingState(val);
		setSetting(key, val);
	};

	return [settingState, updateSetting];
};

export { Settings, getSetting, setSetting, useSetting };
