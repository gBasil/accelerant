import carIcon from './scripts/carIcon';
import perfectNitros from './scripts/perfectNitros';

// Create clones of some functions we use later. Nitro Type overrides the protoypes, most likely to prevent cheating.
document.addEventListenerNative = document.addEventListener;
document.removeEventListenerNative = document.removeEventListener;

type InjectedSettings = {
	enablePerfectNitros: boolean;
	colorPerfectNitros: string;
	enableCarIcon: boolean;
}
const settings: InjectedSettings = JSON.parse(document.currentScript!.getAttribute('data-settings')!);

// Perfect Nitros
perfectNitros();

// Set icon as car
carIcon();

export { settings, InjectedSettings };
