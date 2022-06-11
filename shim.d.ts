import { ProtocolWithReturn } from 'webext-bridge';

// type GetBannerRequest = {
// 	key: string;
// };
// type GetBannerResponse = {data: number};
declare module 'webext-bridge' {
	export interface ProtocolMap {
		// define message protocol types
		// see https://github.com/antfu/webext-bridge#type-safe-protocols
		'tab-prev': { title: string | undefined };
		'get-current-tab': ProtocolWithReturn<
			{ tabId: number },
			{ title: string }
		>;
		'upload-banner': {
			key: string;
			data: string;
		};
		'get-banner': ProtocolWithReturn<
			{
				key: string;
			},
			string | null
		>;
		'mv3-upload-racetrack': string;
		'mv2-rebuild-racetrack': {};
		'mv3-update-adblock': {};
	}
}
