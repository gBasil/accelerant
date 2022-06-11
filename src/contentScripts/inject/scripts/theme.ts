import injectStyle from '~/helpers/injectStyle';
import { getSetting } from '~/helpers/settings';

const theme = async () => {
	if (await getSetting('overrideColorForeground'))
		injectStyle(
			`.dash-copy { color: ${await getSetting('colorForeground')}; }`
		);

	if (await getSetting('overrideColorForegroundActive'))
		injectStyle(
			`.dash-letter.is-incorrect, .dash-letter.is-waiting { color: ${await getSetting(
				'colorForegroundActive'
			)} !important; }`
		);

	if (await getSetting('overrideColorForegroundTyped'))
		injectStyle(
			`.dash-letter.is-typed { color: ${await getSetting(
				'colorForegroundTyped'
			)} !important; opacity: 1; }`
		);

	if (await getSetting('overrideColorBackground'))
		injectStyle(
			`.dash-copyContainer { background: ${await getSetting(
				'colorBackground'
			)} !important; }`
		);

	if (await getSetting('overrideColorBackgroundActive'))
		injectStyle(
			`.dash-letter.is-waiting { background: ${await getSetting(
				'colorBackgroundActive'
			)} !important; }`
		);

	if (await getSetting('overrideColorBackgroundIncorrect'))
		injectStyle(
			`.dash-letter.is-incorrect { background: ${await getSetting(
				'colorBackgroundIncorrect'
			)} !important; }`
		);
};

export default theme;
