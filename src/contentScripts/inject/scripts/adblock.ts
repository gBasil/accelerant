import injectStyle from '~/helpers/injectStyle';
import { getSetting } from '~/helpers/settings';

const adblock = async () => {
	if (await getSetting('adblock'))
		injectStyle('.ad, .profile-ad { display: none !important; }');
};

export default adblock;
