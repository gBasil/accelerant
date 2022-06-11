const injectStyle = (style: string) => {
	const styleEl = document.createElement('style');
	styleEl.innerText = style;
	document.head.append(styleEl);
};

export default injectStyle;
