type PProps = {
	subdued?: boolean;
	noMargin?: boolean;
	children: string;
};

const P = (props: PProps) => {
	return (
		<p
			style={{
				...(props.subdued ? { color: '#acacac' } : {}),
				...(props.noMargin ? { marginBottom: 0 } : {})
			}}
		>
			{props.children}
		</p>
	);
};

export default P;
