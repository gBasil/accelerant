
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import * as Popover from '@radix-ui/react-popover';

type ColorProps = {
	default: string;
	children: string;
	onChange: (color: string) => void;
};

const Color = (props: ColorProps) => {
	const [color, setColor] = useState(props.default);

	return (
		<Popover.Root>
			<Popover.Trigger
				style={{
					display: 'flex',
					gap: '8px',
					alignItems: 'center',
				}}
			>
				<button
					style={{
						width: 24,
						height: 24,
						background: color,
						borderRadius: '8px',
						cursor: 'pointer',
						boxShadow: `0px 2px 20px ${color}`,
					}}
				/>
				{props.children}
			</Popover.Trigger>
			<Popover.Content side='left' sideOffset={8}>
				<HexColorPicker
					color={color}
					onChange={(color) => {
						setColor(color);
						props.onChange(color);
					}}
				/>
			</Popover.Content>
		</Popover.Root>
	);
};

export default Color;
