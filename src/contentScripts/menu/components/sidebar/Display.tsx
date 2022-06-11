import { Monitor } from 'lucide-react';
import { sendMessage } from 'webext-bridge';
import { setSetting, useSetting } from '~/helpers/settings';
import H1 from '../H1';
import P from '../P';
import Popover from '../Popover';
import Switch from '../Switch';

// This could be cleaned up by extracting a switch into a separate component
const Display = () => {
	const [adblock, setAdblock] = useSetting('adblock');
	const [showGitHubButton, setShowGitHubButton] =
		useSetting('showGitHubButton');
	const [hideSeason, setHideSeason] = useSetting('hideSeason');
	const [hideFooter, setHideFooter] = useSetting('hideFooter');
	const [hideBuyCash, setHideBuyCash] = useSetting('hideBuyCash');
	const [hideChat, setHideChat] = useSetting('hideChat');
	const [hideTypingFlag, setHideTypingFlag] = useSetting('hideTypingFlag');
	const [hideSoundControls, setHideSoundControls] =
		useSetting('hideSoundControls');
	const [hideNotifications, setHideNotifications] =
		useSetting('hideNotifications');
	const [hideAchievements, setHideAchievements] =
		useSetting('hideAchievements');
	const [hideIndicators, setHideIndicators] = useSetting('hideIndicators');
	const [hideAlternateLogins, setHideAlternateLogins] = useSetting(
		'hideAlternateLogins'
	);
	const [hideAccountDropdown, setHideAccountDropdown] = useSetting(
		'hideAccountDropdown'
	);

	return (
		<>
			<H1>Display</H1>
			<P subdued>Modify elements of the interface.</P>

			<div className='a-switches'>
				<Switch
					checked={adblock}
					onCheckedChange={async (val) => {
						setAdblock(val);
						if (process.env.MANIFEST_VERSION === '3') {
							await setSetting('adblock', val);
							sendMessage('mv3-update-adblock', {});
						}
					}}
					htmlFor='adblock'
				>
					Block ads
				</Switch>
				<Switch
					checked={showGitHubButton}
					onCheckedChange={setShowGitHubButton}
					htmlFor='showGitHubButton'
				>
					Show GitHub button
					<Popover>
						<img
							src={browser.runtime.getURL(
								'assets/previews/githubButton.png'
							)}
							alt='GitHub button'
						/>
					</Popover>
				</Switch>
				<Switch
					checked={hideSeason}
					onCheckedChange={setHideSeason}
					htmlFor='hideSeason'
				>
					Hide season banner
					<Popover>
						<img
							src={browser.runtime.getURL(
								'assets/previews/seasonBanner.png'
							)}
							alt='Season banner'
						/>
					</Popover>
				</Switch>
				<Switch
					checked={hideFooter}
					onCheckedChange={setHideFooter}
					htmlFor='hideFooter'
				>
					Hide footer
				</Switch>
				<Switch
					checked={hideBuyCash}
					onCheckedChange={setHideBuyCash}
					htmlFor='hideBuyCash'
				>
					Hide buy cash button in Garage
					<Popover>
						<img
							src={browser.runtime.getURL(
								'assets/previews/buyCash.png'
							)}
							alt='Buy cash button'
						/>
					</Popover>
				</Switch>
				<Switch
					checked={hideChat}
					onCheckedChange={setHideChat}
					htmlFor='hideChat'
				>
					Hide chat and stickers
				</Switch>
				<Switch
					checked={hideTypingFlag}
					onCheckedChange={setHideTypingFlag}
					htmlFor='hideTypingFlag'
				>
					Hide finish flag
					<Popover>
						<img
							src={browser.runtime.getURL(
								'assets/previews/finishFlag.png'
							)}
							alt='Finish flag'
						/>
					</Popover>
				</Switch>
				<Switch
					checked={hideSoundControls}
					onCheckedChange={setHideSoundControls}
					htmlFor='hideSoundControls'
				>
					Hide sound controls
					<Popover>
						<img
							src={browser.runtime.getURL(
								'assets/previews/soundControls.png'
							)}
							alt='Sound controls'
						/>
					</Popover>
				</Switch>
				<Switch
					checked={hideNotifications}
					onCheckedChange={setHideNotifications}
					htmlFor='hideNotifications'
				>
					Hide notifications
				</Switch>
				<Switch
					checked={hideAchievements}
					onCheckedChange={setHideAchievements}
					htmlFor='hideAchievements'
				>
					Hide achievement popups
				</Switch>
				<Switch
					checked={hideIndicators}
					onCheckedChange={setHideIndicators}
					htmlFor='hideIndicators'
				>
					Hide menu indicators
					<Popover>
						<img
							src={browser.runtime.getURL(
								'assets/previews/menuIndicators.png'
							)}
							alt='Menu indicators (red dots)'
						/>
					</Popover>
				</Switch>
				<Switch
					checked={hideAlternateLogins}
					onCheckedChange={setHideAlternateLogins}
					htmlFor='hideAlternateLogins'
				>
					Hide alternative login options
					<Popover>
						<img
							src={browser.runtime.getURL(
								'assets/previews/alternateLogins.png'
							)}
							alt='Alternate logins'
						/>
					</Popover>
				</Switch>
				<Switch
					checked={hideAccountDropdown}
					onCheckedChange={setHideAccountDropdown}
					htmlFor='hideAccountDropdown'
				>
					Hide account dropdown
				</Switch>
			</div>
		</>
	);
};

const displayEntry = {
	title: 'Display',
	icon: <Monitor height={18} width={18} />,
	content: <Display />,
};

export default displayEntry;
