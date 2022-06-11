import { Github } from 'lucide-react';
import { useState } from 'react';
import { useSetting } from '~/helpers/settings';
import packageJSON from '../../../../package.json';

type SidebarProps = {
	initialValue: number;
	items: {
		title: string;
		icon: JSX.Element;
		content: JSX.Element | JSX.Element[];
	}[];
};

const Sidebar = (props: SidebarProps) => {
	const [activeTab, setActiveTab] = useState(props.initialValue);
	const [showGitHubButton] = useSetting('showGitHubButton');

	return (
		<div className='a-card-sidebar'>
			<div className='a-sidebar'>
				{props.items.map((item, i) => (
					<button
						{...(i === activeTab ? { className: 'a-active' } : {})}
						key={item.title}
						onClick={() => setActiveTab(i)}
					>
						{item.icon}
						{item.title}
					</button>
				))}
				{showGitHubButton && (
					<a
						target='_blank'
						rel='noreferrer'
						href={packageJSON.repository.url}
					>
						<button className='a-button'>
							<Github height={18} width={18} />
							GitHub
						</button>
					</a>
				)}
			</div>
			<div className='a-sidebar-content'>
				{props.items[activeTab].content}
			</div>
		</div>
	);
};

export default Sidebar;
