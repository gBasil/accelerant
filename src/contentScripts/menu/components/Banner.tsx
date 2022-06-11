import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import browser from 'webextension-polyfill';
import Switch from './Switch';
import { sendMessage } from 'webext-bridge';
import { getSetting, setSetting } from '~/helpers/settings';
import { blobToDataURI } from '~/helpers/files';
import buildTrack from '~/helpers/buildTrack';
import toast from 'react-hot-toast';

type BannerProps = {
	index: number;
};

const Banner = (props: BannerProps) => {
	const originalBanner = useMemo(
		() =>
			browser.runtime.getURL(`assets/defaultBanners/${props.index}.png`),
		[props.index]
	);
	const ref = useRef<HTMLInputElement>(null);
	const [hasBanner, setHasBanner] = useState(false);
	const [banner, setBanner] = useState(originalBanner);
	const [enabled, setEnabled] = useState(false);

	const setEnabledCallback = async (bool: boolean) => {
		setEnabled(bool);

		const key = `banner/${props.index}`;
		const current: string[] = await getSetting('shownBanners');

		if (!bool)
			setSetting(
				'shownBanners',
				current.filter((item) => item !== key)
			);
		else
			setSetting(
				'shownBanners',
				current.includes(key) ? current : [...current, key]
			);

		build();
	};

	// Set banner
	useEffect(() => {
		(async () => {
			// Set banner
			const response = await sendMessage('get-banner', {
				key: `banner/${props.index}`,
			});

			if (!!response) {
				setBanner(response);
				setHasBanner(true);
			}

			// Toggle the enabled switch
			if (
				(await getSetting('shownBanners')).includes(
					`banner/${props.index}`
				)
			)
				setEnabled(true);
		})();
	}, [props.index]);

	const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || !e.target.files.length) return;

		const blob = new Blob([e.target.files[0]], {
			type: e.target.files[0].type,
		});

		// Make sure the banner is compatible (file type & size)
		if (e.target.files[0].type !== 'image/png')
			return toast.error('Banners must be PNG files');

		const img = new Image();
		var objectUrl = URL.createObjectURL(e.target.files[0]);
		img.src = objectUrl;
		await img.decode();

		if (img.width !== 650 || img.height !== 130)
			return toast.error('Banners must be 650x130');

		await sendMessage('upload-banner', {
			key: `banner/${props.index.toString()}`,
			data: await blobToDataURI(blob),
		});

		const url = URL.createObjectURL(blob);
		setBanner(url);
		setHasBanner(true);

		build();
	};

	// Rebuild the racetrack
	const build = async () => {
		if (process.env.MANIFEST_VERSION === '3')
			sendMessage('mv3-upload-racetrack', await buildTrack());
		else if (process.env.MANIFEST_VERSION === '2')
			sendMessage('mv2-rebuild-racetrack', {});
	};

	return (
		<div className='a-banner'>
			<div>
				<div>
					<img src={originalBanner} alt='Original banner' />
				</div>
				<svg
					width='32'
					height='48'
					viewBox='0 0 53 36'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M2 18H50M50 18L34 2M50 18L34 34'
						stroke='white'
						strokeOpacity='0.5'
						strokeWidth='4'
						strokeLinecap='round'
					/>
				</svg>
				<button onClick={() => ref.current!.click()}>
					{hasBanner ? (
						<img
							src={banner}
							className='a-banner-image'
							alt='Custom banner'
						/>
					) : (
						<div className='a-banner-empty'>
							<p>Click to upload file</p>
						</div>
					)}
					<img
						src={originalBanner}
						className='a-banner-hidden'
						alt=''
					/>
					<input
						ref={ref}
						type='file'
						onChange={onChange}
						accept='image/png'
					/>
				</button>
			</div>
			<hr />
			<div>
				<Switch
					checked={enabled}
					htmlFor={`enabled-${props.index}`}
					onCheckedChange={setEnabledCallback}
				>
					{enabled ? 'Enabled' : 'Disabled'}
				</Switch>
			</div>
		</div>
	);
};

export default Banner;
