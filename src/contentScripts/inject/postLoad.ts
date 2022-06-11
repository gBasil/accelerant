// Scripts here are run after the page content loads. Run in `menu/index.tsx`
import sessionStats from './scripts/sessionStats';

const runPostLoad = () => {
	// Add Accelerant to menu
	const li = document.createElement('li');
	li.className = 'nav-list-item';
	if (window.location.href === 'https://www.nitrotype.com/accelerant')
		li.classList.add('is-current');

	const a = document.createElement('a');
	a.className = 'nav-link';
	a.innerText = 'Accelerant';
	a.href = '/accelerant';

	li.append(a);
	document.querySelector('ul.nav-list')?.append(li);

	// Statistics about the current session
	sessionStats();
};

export default runPostLoad;
