import { SwitchThumb, Switch as RadixSwitch } from '@radix-ui/react-switch';

type SwitchProps = {
	htmlFor: string;
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
	children: JSX.Element | string | (string | JSX.Element)[];
	noLabel?: boolean;
};

const Switch = (props: SwitchProps) => {
	return (
		<span className='a-switch-container'>
			<RadixSwitch
				className='a-switch'
				id={props.htmlFor}
				checked={props.checked}
				onCheckedChange={props.onCheckedChange}
			>
				<SwitchThumb className='a-switch-thumb' />
			</RadixSwitch>
			{props.noLabel ? (
				props.children
			) : (
				<label htmlFor={props.htmlFor}>{props.children}</label>
			)}
		</span>
	);
};

export default Switch;
