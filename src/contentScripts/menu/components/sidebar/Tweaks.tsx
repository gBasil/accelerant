import { Zap } from 'lucide-react';
import { useSetting } from '~/helpers/settings';
import Color from '../Color';
import H1 from '../H1';
import H2 from '../H2';
import P from '../P';
import Switch from '../Switch';
import Popover from '../Popover';

const Tweaks = () => {
	const [colorPerfectNitros, setColorPerfectNitros] =
		useSetting('colorPerfectNitros');
	const [enablePerfectNitros, setEnablePerfectNitros] = useSetting(
		'enablePerfectNitros'
	);
	const [enableCarIcon, setEnableCarIcon] = useSetting('enableCarIcon');
	const [sessionStats, setSessionStats] = useSetting('sessionStats');

	return (
		<>
			<H1>Tweaks</H1>
			<P subdued>Utility scripts.</P>

			<div className='a-tweaks'>
				<div>
					<H2>
						Perfect Nitros
						<Popover>
							<img
								src={browser.runtime.getURL(
									'assets/previews/perfectNitro.png'
								)}
								alt='Perfect Nitro Preview'
							/>
						</Popover>
					</H2>
					<P subdued noMargin>
						Highlight the most optimal place to use a Nitro in.
					</P>

					<div className='a-tweaks-options'>
						<Switch
							checked={enablePerfectNitros}
							onCheckedChange={setEnablePerfectNitros}
							htmlFor='enablePerfectNitros'
						>
							Enabled
						</Switch>
						{colorPerfectNitros && (
							<Color
								default={colorPerfectNitros}
								onChange={setColorPerfectNitros}
							>
								Highlight color
							</Color>
						)}
					</div>
				</div>

				<div>
					<H2>
						Car Icon
						<Popover>
							<img
								src={browser.runtime.getURL(
									'assets/previews/carIcon.png'
								)}
								alt='Car Icon Preview'
							/>
						</Popover>
					</H2>
					<P subdued noMargin>
						Replace the green profile icon in the top right of the
						screen with your current car.
					</P>

					<div className='a-tweaks-options'>
						<Switch
							checked={enableCarIcon}
							onCheckedChange={setEnableCarIcon}
							htmlFor='enableCarIcon'
						>
							Enabled
						</Switch>
					</div>
				</div>

				<div>
					<H2>
						Session Statistics
						<Popover>
							<img
								src={browser.runtime.getURL(
									'assets/previews/sessionStats.png'
								)}
								alt='Session Statistics Preview'
							/>
						</Popover>
					</H2>
					<P subdued noMargin>
						Add text to the profile dropdown button, displaying your
						current session races count.
					</P>

					<div className='a-tweaks-options'>
						<Switch
							checked={sessionStats}
							onCheckedChange={setSessionStats}
							htmlFor='sessionStats'
						>
							Enabled
						</Switch>
					</div>
				</div>
			</div>
		</>
	);
};

const tweaksEntry = {
	title: 'Tweaks',
	icon: <Zap height={18} width={18} />,
	content: <Tweaks />,
};

export default tweaksEntry;
