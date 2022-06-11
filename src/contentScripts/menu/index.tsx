import React from 'react';
import ReactDOM from 'react-dom';
import { Toaster } from 'react-hot-toast';
import injectStyle from '~/helpers/injectStyle';
import runPostLoad from '../inject/postLoad';
import App from './components/app';

import styles from './index.scss';

(async () => {
	// Inject styles
	injectStyle(styles);

	// Run here because declaring another content script seems like overkill
	runPostLoad();
})();

// If on the right page, render our settings
if (window.location.pathname === '/accelerant') {
	ReactDOM.render(
		<React.StrictMode>
			<Toaster
				position='bottom-left'
				toastOptions={{
					className: 'a-toast',
				}}
			/>
			<App />
		</React.StrictMode>,
		document.querySelector('main')
	);
}
