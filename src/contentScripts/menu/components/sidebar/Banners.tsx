import { Flag } from 'lucide-react';
import Banner from '../Banner';
import H1 from '../H1';
import P from '../P';

const Banners = () => (
	<>
		<H1>Banners</H1>
		<P subdued>
			Replace in-game banners with your own. You may have to refresh your
			cache to see updates, which is Ctrl + Shift + R on most browsers.
		</P>

		<P subdued>
			When uploading a banner, it must be a PNG image with a width of 334
			pixels and a height of 65 pixels. You can downscale it after you
			design it.
		</P>

		<div
			style={{
				display: 'flex',
				gap: '24px',
				flexDirection: 'column',
			}}
		>
			<Banner index={1} />
			<Banner index={2} />
			<Banner index={3} />
			<Banner index={4} />
			<Banner index={5} />
		</div>
	</>
);

const bannersEntry = {
	title: 'Banners',
	icon: <Flag height={18} width={18} />,
	content: <Banners />,
};

export default bannersEntry;
