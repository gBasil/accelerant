type H2Props = {
	children: string | (string | JSX.Element)[];
}

const H2 = (props: H2Props) => {
	return (
		<h2 className='a-h2'>{props.children}</h2>
	)
}

export default H2