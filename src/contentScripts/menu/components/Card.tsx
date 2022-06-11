import H1 from './H1';

type CardProps = {
	title: string;
	children: JSX.Element[] | JSX.Element;
	topPadding?: boolean;
};

const Card = (props: CardProps) => (
	<section
		className='a-card'
		style={props.topPadding ? { marginTop: 10 } : {}}
	>
		<div className='a-card-header'>
			<H1>{props.title}</H1>
		</div>
		<div className='a-card-content'>{props.children}</div>
	</section>
);

export default Card;
