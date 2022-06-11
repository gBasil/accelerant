import { getFromDB } from './files';
import { getSetting } from './settings';
// @ts-ignore
import { Homography } from '../lib/Homography.js';

const buildTrack = () =>
	new Promise<string>(async (resolve, reject) => {
		// TODO: Clear cache here. The user will have to do it themselves, so we might as well do it for them.
		try {
			// Load images
			const mainImg = new Image();
			const data = await fetch(
				'https://www.nitrotype.com/assets/tracks/speedway/default.png?' +
					Date.now()
			);
			mainImg.src = URL.createObjectURL(await data.blob());
			await mainImg.decode();

			// Create canvas
			const canvas = document.createElement('canvas');
			canvas.height = mainImg.height;
			canvas.width = mainImg.width;

			// Get context
			const ctx = canvas.getContext('2d')!;

			// Draw background
			ctx.drawImage(mainImg, 0, 0);

			const banners: string[] = await getSetting('shownBanners');
			const bannerLocations = {
				// Corndog Nitros
				'banner/1': [194, 1101],
				// Nitro speedway
				'banner/2': [194, 1168],
				// Smith's Nitro Fitness
				'banner/3': [194, 1235],
				// NitroFurze
				'banner/4': [535, 201],
				// Julian's Tacos
				'banner/5': [535, 268],
			};

			for (const key of banners) {
				const dataURI = await getFromDB(key);
				if (!dataURI) return;

				const banner = new Image();
				banner.src = dataURI;
				await banner.decode();

				// Create perspective warp
				const homography = new Homography();
				const srcPoints = [
					[0, 0],
					[0, banner.height],
					[banner.width, 0],
					[banner.width, banner.height],
				];
				const dstPoints = [
					[0, 0],
					[10, 65],
					[335, 0],
					[325, 65],
				];

				homography.setSourcePoints(srcPoints);
				homography.setImage(banner);
				homography.setDestinyPoints(dstPoints);

				const newBanner: ImageData = homography.warp();

				ctx.putImageData(
					newBanner,
					// @ts-ignore
					bannerLocations[key][0],
					// @ts-ignore
					bannerLocations[key][1]
				);
			}

			resolve(canvas.toDataURL());
		} catch {
			reject(null);
		}
	});

export default buildTrack;
