import injectStyle from '~/helpers/injectStyle';
import { settings } from '../injected';

// TODO: Don't run if practice (account creation) race.
const perfectNitros = async () => {
	if (
		document.location.pathname.startsWith('/race') &&
		settings.enablePerfectNitros
	) {
		injectStyle(
			`.dash-word.a-longest .dash-letter:not(.is-typed):not(.empty):not(.is-incorrect):not(.is-waiting) { background: ${settings.colorPerfectNitros}; }`
		);

		const update = () => {
			const compare = (a: HTMLSpanElement, b: HTMLSpanElement) => {
				return (
					Array.from(a.children).filter(
						(el) => !el.classList.contains('is-typed')
					).length >=
					Array.from(b.children).filter(
						(el) => !el.classList.contains('is-typed')
					).length
				);
			};

			if (document.querySelector('.dash-copy')) {
				// Calculate current longest word
				const words = Array.from(
					document.querySelector('.dash-copy')!.children
				);
				const longest = words.reduce<HTMLSpanElement | null>(
					(prev, el) =>
						!prev || compare(el as HTMLSpanElement, prev)
							? (el as HTMLSpanElement)
							: prev,
					null
				)!;

				// We leave behind baggage when changing words, but that doesn't affect anything.
				longest.children[longest.children.length - 1].classList.add(
					'empty'
				);
				document
					.querySelector('.a-longest')
					?.classList.remove('a-longest');
				longest.classList.add('a-longest');
			}
		};

		const ev = (e: KeyboardEvent) => {
			// This could be optimized to not run when not needed, e.g. when not typing on the longest word
			update();
			// If the enter key is pressed and the chat is gone, (race started) clean up and exit
			if (e.key === 'Enter' && !document.querySelector('.raceChat')) {
				document.removeEventListenerNative('keydown', ev, true);
				document
					.querySelector('.a-longest')
					?.classList.remove('a-longest');
			}
		};

		// Update when a key is pressed
		document.addEventListenerNative('keydown', ev, true);

		// Update when the racetrack appears
		const observer = new MutationObserver(() => {
			if (document.querySelector('.dash-copyContainer')) {
				update();
				observer.disconnect();
			}
		});

		observer.observe(document.body, {
			attributeFilter: ['class'],
			subtree: true,
		});
	}
};

export default perfectNitros;
