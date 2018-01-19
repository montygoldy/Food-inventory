import React from 'react';
import '../css/order.scss';
import {formatPrice} from '../helpers';

class Order extends React.Component{
  constructor(){
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(key){
    const item = this.props.items[key];
    const count = this.props.order[key];

    if(!item || item.status === 'unavailable'){
      return <li key={key}> Sorry, {item ? item.name : "item"} is no longer available!
        <button onClick={() => this.props.removeOrder(key)} > &times; </button>
      </li>

    }

    return(
      <li key={key}>
        <span>{count}lbs {item.name}</span>
        <span className="price">{formatPrice(count * item.price)}</span>
        <button onClick={() => this.props.removeOrder(key)} > &times; </button>
      </li>
    )
  }

  render(){
    const orderIds = Object.keys(this.props.order)
    const total = orderIds.reduce((prevTotal, key) => {
      const item = this.props.items[key];
      const count = this.props.order[key];
      const isAvailable = item && item.status === 'available';
      if(isAvailable){
        return prevTotal + (count * item.price || 0)
      }

      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total</strong>
            {formatPrice(total)}
          </li>
        </ul>
      </div>
    )
  }
}

Order.propTypes = {
  items: React.PropTypes.object.isRequired,
  order: React.PropTypes.object.isRequired,
  removeOrder: React.PropTypes.func.isRequired
}

export default Order;