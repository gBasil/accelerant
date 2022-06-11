import classNames from 'classnames';
import deepmerge from 'deepmerge';
import { CSSProperties } from 'react';
import { useSetting } from '~/helpers/settings';

type ThemePreviewProps = {
	cursorIndex: number;
	incorrect?: boolean;
};

const style = (condition: boolean, style: CSSProperties) =>
	condition ? { style } : {};

const ThemePreview = (props: ThemePreviewProps) => {
	const now = Date.now();
	const [colorBackground] = useSetting('colorBackground', [now]);
	const [overrideColorBackground] = useSetting('overrideColorBackground', [now]);
	const [colorForeground] = useSetting('colorForeground', [now]);
	const [overrideColorForeground] = useSetting('overrideColorForeground', [now]);
	const [colorForegroundActive] = useSetting('colorForegroundActive', [now]);
	const [overrideColorForegroundActive] = useSetting(
		'overrideColorForegroundActive'
	, [now]);
	const [colorForegroundTyped] = useSetting('colorForegroundTyped', [now]);
	const [overrideColorForegroundTyped] = useSetting(
		'overrideColorForegroundTyped'
	, [now]);
	const [colorBackgroundActive] = useSetting('colorBackgroundActive', [now]);
	const [overrideColorBackgroundActive] = useSetting(
		'overrideColorBackgroundActive'
	, [now]);
	const [colorBackgroundIncorrect] = useSetting('colorBackgroundIncorrect', [now]);
	const [overrideColorBackgroundIncorrect] = useSetting(
		'overrideColorBackgroundIncorrect'
	, [now]);

	return (
		<div
			className='a-theme-preview'
			{...style(overrideColorBackground, {
				background: colorBackground,
			})}
		>
			{'The Quick Brown Fox is afraid of The Big Black'
				.split('')
				.map((char, i) => (
					<span
						className={classNames([
							i === props.cursorIndex &&
								(props.incorrect
									? 'a-char-incorrect'
									: 'a-char-active'),
							i < props.cursorIndex && 'a-char-typed',
						])}
						// Text foreground
						{...style(
							i > props.cursorIndex && overrideColorForeground,
							{
								color: colorForeground,
							}
						)}
						// Active background
						{...deepmerge(
							style(
								i === props.cursorIndex &&
									(props.incorrect
										? overrideColorBackgroundIncorrect
										: overrideColorBackgroundActive),
								{
									background: props.incorrect
										? colorBackgroundIncorrect
										: colorBackgroundActive,
								}
							),
							// Active foreground
							style(
								i === props.cursorIndex &&
									overrideColorForegroundActive,
								{
									color: colorForegroundActive,
								}
							)
						)}
						// Typed foreground
						{...style(
							i < props.cursorIndex &&
								overrideColorForegroundTyped,
							{
								opacity: 1,
								color: colorForegroundTyped,
							}
						)}
						key={i}
					>
						{char}
					</span>
				))}
		</div>
	);
};

export default ThemePreview;
