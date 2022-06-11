type H1Props = {
	children: string;
}

const H1 = (props: H1Props) => {
	return (
		<h1 className='a-h1'>{props.children}</h1>
	)
}

export default H1