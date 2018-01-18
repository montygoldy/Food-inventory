import React from 'react';
import { formatPrice } from '../helpers';

class Item extends React.Component{
  render(){
    const { details } = this.props
    return(
      <li className="item_list">
        <img src={details.image} alt={details.name} />
        <h3 className="item-name">
          {details.name}
          <span className="price"> {formatPrice(details.price)} </span>
        </h3>
        <p> { details.desc } </p>
        <button>Add to Order</button>
      </li>
    )
  }
}

export default Item;
