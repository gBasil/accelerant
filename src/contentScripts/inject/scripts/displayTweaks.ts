import injectStyle from '~/helpers/injectStyle';
import { getSetting } from '~/helpers/settings';

const displayTweaks = async () => {
	// Hide season banner
	if (await getSetting('hideSeason'))
		injectStyle('.seasonTeaser { display: none !important; }');

	// Hide footer
	if (await getSetting('hideFooter'))
		injectStyle('footer { display: none !important; }');

	// Hide cash purchase button
	if (await getSetting('hideBuyCash'))
		injectStyle(
			'.profile--content--current-cash .bucket-media { display: none !important }'
		);

	// Hide chat bubbles (text & stickers)
	if (await getSetting('hideChat'))
		injectStyle('.raceChat { display: none !important; }');

	// Hide the little flag at the end of the text input
	if (await getSetting('hideTypingFlag'))
		injectStyle(
			'.dash-letter > img[alt="Finish"] { display: none !important; }'
		);

	// Hide the sound controls at the top right of the racing screen
	if (await getSetting('hideSoundControls'))
		injectStyle('.sound-controls { display: none !important }');

	// Hide notifications, or growls. Rawr~
	if (await getSetting('hideNotifications'))
		injectStyle('.growls { display: none !important }');

	// Hide achievements
	if (await getSetting('hideAchievements'))
		injectStyle('.notifications { display: none !important }');

	// Hide new message indicators (shop, friends, team, etc)
	if (await getSetting('hideIndicators'))
		injectStyle('.notify { display: none !important }');

	// Hide alternate logins
	if (await getSetting('hideAlternateLogins')) {
		if (document.location.pathname === '/login')
			injectStyle(
				'.split.split--divided > :not(:last-child) { display: none; } .split.split--divided > :last-child { max-width: 25rem; margin: auto; }'
			);
		else if (document.location.pathname === '/race')
			injectStyle(
				'.race-results--qualifying--signup > :not(.race-results--qualifying--form) { display: none; }'
			);
	}

	if (await getSetting('hideAccountDropdown'))
		injectStyle('.dropdown--account { display: none !important }')
};

export default displayTweaks;
