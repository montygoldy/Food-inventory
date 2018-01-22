import React from 'react';
import { formatPrice } from '../helpers';

class Item extends React.Component{
  render(){
    const { details, index } = this.props
    const isAvailable = details.status === 'available';
    const buttonText = isAvailable ? 'Add to Order' : 'Sold Out!';
    return(
      <li className="item_list">
        <img src={details.image} alt={details.name} />

        <h3 className="item-name">
          {details.name}
        </h3>
        <div className="data_section">
          <span className="price"> {formatPrice(details.price)} </span>
          <p> { details.desc } </p>
          <button onClick={() => this.props.addToOrder(index)} disabled={!isAvailable}><i className="fa fa-cart-plus" aria-hidden="true"></i> {buttonText}</button>
        </div>
      </li>
    )
  }
}

Item.propTypes = {
  details: React.PropTypes.object.isRequired,
  index: React.PropTypes.string.isRequired,
  addToOrder: React.PropTypes.func.isRequired
}

export default Item;
