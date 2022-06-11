import { Palette } from 'lucide-react';
import { useSetting } from '~/helpers/settings';
import Color from '../Color';
import H1 from '../H1';
import P from '../P';
import Switch from '../Switch';
import ThemePreview from '../ThemePreview';

// This could be cleaned up. A lot.
const Theme = () => {
	const [colorBackground, setColorBackground] = useSetting('colorBackground');
	const [overrideColorBackground, setOverrideColorBackground] = useSetting(
		'overrideColorBackground'
	);
	const [colorForeground, setColorForeground] = useSetting('colorForeground');
	const [overrideColorForeground, setOverrideColorForeground] = useSetting(
		'overrideColorForeground'
	);
	const [colorForegroundActive, setColorForegroundActive] = useSetting(
		'colorForegroundActive'
	);
	const [overrideColorForegroundActive, setOverrideColorForegroundActive] =
		useSetting('overrideColorForegroundActive');
	const [colorForegroundTyped, setColorForegroundTyped] = useSetting(
		'colorForegroundTyped'
	);
	const [overrideColorForegroundTyped, setOverrideColorForegroundTyped] =
		useSetting('overrideColorForegroundTyped');
	const [colorBackgroundActive, setColorBackgroundActive] = useSetting(
		'colorBackgroundActive'
	);
	const [overrideColorBackgroundActive, setOverrideColorBackgroundActive] =
		useSetting('overrideColorBackgroundActive');
	const [colorBackgroundIncorrect, setColorBackgroundIncorrect] = useSetting(
		'colorBackgroundIncorrect'
	);
	const [
		overrideColorBackgroundIncorrect,
		setOverrideColorBackgroundIncorrect,
	] = useSetting('overrideColorBackgroundIncorrect');

	return (
		<>
			<H1>Theme</H1>
			<P subdued>Customize the colors on the racetrack.</P>

			<P>Preview:</P>
			<ThemePreview cursorIndex={7} />
			<ThemePreview cursorIndex={7} incorrect />

			<div className='a-switches'>
				{colorBackground && (
					<Switch
						checked={overrideColorBackground}
						htmlFor='overrideColorBackground'
						onCheckedChange={setOverrideColorBackground}
						noLabel
					>
						<Color
							default={colorBackground}
							onChange={setColorBackground}
						>
							Background color
						</Color>
					</Switch>
				)}
				{colorForeground && (
					<Switch
						checked={overrideColorForeground}
						htmlFor='overrideColorForeground'
						onCheckedChange={setOverrideColorForeground}
						noLabel
					>
						<Color
							default={colorForeground}
							onChange={setColorForeground}
						>
							Text color
						</Color>
					</Switch>
				)}
				{colorForegroundActive && (
					<Switch
						checked={overrideColorForegroundActive}
						htmlFor='overrideColorForegroundActive'
						onCheckedChange={setOverrideColorForegroundActive}
						noLabel
					>
						<Color
							default={colorForegroundActive}
							onChange={setColorForegroundActive}
						>
							Active letter color
						</Color>
					</Switch>
				)}
				{colorForegroundTyped && (
					<Switch
						checked={overrideColorForegroundTyped}
						htmlFor='overrideColorForegroundTyped'
						onCheckedChange={setOverrideColorForegroundTyped}
						noLabel
					>
						<Color
							default={colorForegroundTyped}
							onChange={setColorForegroundTyped}
						>
							Typed letter color
						</Color>
					</Switch>
				)}
				{colorBackgroundActive && (
					<Switch
						checked={overrideColorBackgroundActive}
						htmlFor='overrideColorBackgroundActive'
						onCheckedChange={setOverrideColorBackgroundActive}
						noLabel
					>
						<Color
							default={colorBackgroundActive}
							onChange={setColorBackgroundActive}
						>
							Active letter background color
						</Color>
					</Switch>
				)}
				{colorBackgroundIncorrect && (
					<Switch
						checked={overrideColorBackgroundIncorrect}
						htmlFor='overrideColorBackgroundIncorrect'
						onCheckedChange={setOverrideColorBackgroundIncorrect}
						noLabel
					>
						<Color
							default={colorBackgroundIncorrect}
							onChange={setColorBackgroundIncorrect}
						>
							Incorrect letter background color
						</Color>
					</Switch>
				)}
			</div>
		</>
	);
};

const themeEntry = {
	title: 'Theme',
	icon: <Palette height={18} width={18} />,
	content: <Theme />,
};

export default themeEntry;
