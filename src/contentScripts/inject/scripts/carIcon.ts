import { settings } from '../injected';

type Car = {
	carID: number;
	options: {
		smallSrc: string;
	}
}

const carIcon = async () => {
	if (settings.enableCarIcon)
		try {
			// A bit hacky. Keep trying to set the car icon until it works, or give up after five seconds.
			// It could probably be lowered from 5 seconds.
			const i = setInterval(() => {
				const { carID, carHueAngle } = JSON.parse(
					JSON.parse(localStorage['persist:nt']).user
				);
	
				const src = (window as any).NTGLOBALS.CARS.find((car: Car) => car.carID === carID).options.smallSrc;

				const icon = document.querySelector('svg.icon-user-s');
				if (!icon) return;
				const img = document.createElement('img');
				img.src = `https://www.nitrotype.com/cars/${src}`;
				img.style.height = '18px';
				img.style.width = '18px';
				img.style.filter = `hue-rotate(${carHueAngle}deg)`;
				img.style.objectFit = 'contain';
	
				icon.replaceWith(img);
				clearInterval(i);
			}, 100);

			setTimeout(() => clearInterval(i), 5000);
		} catch {
			console.error('Err!')
		}
};

export default carIcon;
