# ![](extension/assets/icon.svg) Accelerant

A browser extension to improve your Nitro Type experience.

[Chrome Extension](https://chrome.google.com/webstore/detail/accelerant/ieocjnbdnegbhepiolingifnacbfhcia) - [Firefox Extension](https://addons.mozilla.org/en-US/firefox/addon/accelerant)

## Features

- 👜 Feature rich, with options such as:
	- 🏁 **Custom race banners** (The original purpose of Accelerant)
	- 🎨 Theming
	- ⚡ Tweaks
- 🌸 Integrated cleanly into the UI
- 🔎 Open source

## Development

### General Structure

<!-- I could restructure it to have cleaner names... -->
- `src` - Main source
	- `contentScript` - Scripts and components to be injected as `content_script`s
		- `inject` - Content scripts that apply changes
			- `content.ts` - Main content script, run on `document_start`
			- `injected.ts` - Script running in the website context, run on `document_start`
			- `postLoad.ts` - Secondary content script, run on `document_idle`
		- `menu` - The menu/settings UI logic
	- `background` - Scripts for background
	- `helpers` - Reused code utilities extracted into files
	- `lib` - Libraries that aren't under node_modules
	- `manifest.3.ts` - Manifest V3 for the extension
	- `manifest.2.ts` - Manifest V2 for the extension
- `extension` - Extension package root
	- `assets` - Static assets
	- `dist` - Build directory, not pushed to GitHub

### Running Locally

After installing the dependencies, start the Vite server:

```bash
# For Manifest V3
yarn mv3:dev
yarn start:chromium

# For Manifest V2
yarn mv2:dev
yarn start:firefox
```

`web-ext` auto reloads the extension whenever files in the `extension/` build directory change.

### Building

```bash
# Build for Manifest V3
yarn mv3:build

# Build for Manifest V2
yarn mv2:build

# Pack into a .zip, .xpi, and .crx
yarn run pack
```

## Credits

This repo was based on https://github.com/quolpr/react-vite-webext, which in turn was based on https://github.com/antfu/vitesse-webext

The banners in `extension/assets/defaultBanners` are ripped from the Nitro Type website ([source](https://www.nitrotype.com/assets/tracks/speedway/default.png)) and were adjusted to remove the 3D effect.

The flame in the logo is the `flame` icon from [Lucide](https://lucide.dev), and the background is ripped from the Nitro Type logo.
