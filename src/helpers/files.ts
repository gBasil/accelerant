import browser from 'webextension-polyfill';

// Storage manipulation
const saveToDB = async (key: string, item: string) => {
	browser.storage.local.set({
		[`file/${key}`]: item,
	});

	return;
};

const getFromDB = async (key: string) => {
	const response = await browser.storage.local.get(`file/${key}`);
	const data: string = response[`file/${key}`];

	return data || null;
};

// Blob manipulation
const dataURItoBlob = async (dataURI: string) =>
	await (await fetch(dataURI)).blob();

const blobToDataURI = (blob: Blob) =>
	new Promise<string>((resolve) => {
		var reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.readAsDataURL(blob);
	});

export { saveToDB, getFromDB, dataURItoBlob, blobToDataURI };
