import * as RadixPopover from '@radix-ui/react-popover';
import { Info } from 'lucide-react';

type PopoverProps = {
	children: JSX.Element | JSX.Element[];
};

const Popover = (props: PopoverProps) => {
	return (
		<RadixPopover.Root>
			<RadixPopover.Trigger>
				<Info width={18} height={18} className='a-popover-icon' />
			</RadixPopover.Trigger>
			<RadixPopover.Content
				className='a-popover'
				side='top'
				sideOffset={8}
			>
				<RadixPopover.Arrow className='a-popover-arrow' />
				{props.children}
			</RadixPopover.Content>
		</RadixPopover.Root>
	);
};

export default Popover;
