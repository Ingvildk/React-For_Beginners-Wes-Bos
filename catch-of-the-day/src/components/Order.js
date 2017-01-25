import React from 'react';

class Order extends React.Component {
	render() {
		const orderIds = Object.keys(this.props.order);
		const total = orderIds.reduce((prevTotal, key) => {
			const fish = this.props.fishes[key];
			const count = this.props.order[key];
			const isAvailable = fish && fish.status == 'available';
			if(isAvailable) {
				return prevTotal + (count * fish.price || 0)
			}
			return prevTotal;
		}, 0);
		//const total = orderIds.reduce((prevTotal, key) => {
		//	const fish = this.props.fish[key];
		//});
		return (
			<div className="order-wrap">
				<h2>Your Order</h2>
				<p>{orderIds}</p>
				{total}
			</div>
			)
		}
	}

export default Order;