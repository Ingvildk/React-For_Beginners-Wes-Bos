import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {

	render() {
		const {details, index} = this.props;
		const isAvailable = details.status === 'available';
		const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';	
		return (
		<li className="menu-fish">
			<img src={details.image} alt={details.name} />
			<h3>
				{details.name}
				<span className="price">{formatPrice(details.price)}</span>
			</h3>
			<p>{details.desc}</p>
			<button onClick={() => this.props.addToOrder(index)}
			 disabled={!isAvailable}>{buttonText}</button>	
			<button onClick={() => this.props.removeFish(index)}>Delete</button> 
			<button onClick={() => this.props.removeFromOrder(index)}>Remove from order</button>
		</li>
		)
	}
}

export default Fish;