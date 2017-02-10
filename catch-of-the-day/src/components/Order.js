import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
  constructor() {
    super();
    this.renderOrder = this.renderOrder.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, key) {
    //takes the order value we edited from passed down props
    const order = this.props.order[key];
    //modifies the key word we edited. e.g. price name and so on
    const updatedOrder = {
      ...order,
      [e.target.name]: e.target.value
    }
    //calls the passed down props method which takes the name of the fish and the new updated version
    this.props.updateOrder(key, updatedOrder);
  }

  renderOrder(key) {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

    if(!fish || fish.status === 'unavailable') {
      return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available!
      {removeButton}</li>
    }

    return (
      <li key={key}>
        <span>{count}lbs {fish.name} {removeButton} </span>
        <span className="price">{formatPrice(count * fish.price)}</span>
      </li>
    )
  }

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if(isAvailable) {
        return prevTotal + (count * fish.price || 0)
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </ul>

      </div>
    )
  }
}

export default Order;