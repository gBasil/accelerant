import { getSetting } from '~/helpers/settings';

const sessionStats = async () => {
	if (await getSetting('sessionStats'))
		try {
			const races = JSON.parse(
				JSON.parse(localStorage['persist:nt']).user
			).sessionRaces;

			if (
				races === undefined ||
				!document.querySelector('.dropdown-trigger')
			)
				return;

			const stat = document.createElement('p');

			stat.innerText = `Session races: ${races}`;
			stat.style.margin = 'unset';
			stat.style.color = 'white';
			stat.style.fontSize = '0.8rem';
			stat.style.marginTop = '4px';

			document.querySelector('.dropdown-trigger')?.append(stat);
		} catch {}
};

export default sessionStats;
