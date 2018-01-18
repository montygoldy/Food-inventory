import React from 'react';
import '../css/inventory.scss';
import AddToInventory from './AddToInventory';

class Inventory extends React.Component{
  constructor(){
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(e, key){
    const item = this.props.items[key];
    const updatedItem = {...item, [e.target.name]: e.target.value}
    this.props.updateItem(key, updatedItem);
  }

  renderInventory(key){
    const item = this.props.items[key];
    return(
      <div className="item-edit" key={key}>
        <input type="text" name="name" value={item.name} onChange={(e) => this.handleChange(e, key)} placeholder="Item Name"/>
        <input type="text" name="price" value={item.price} onChange={(e) => this.handleChange(e, key)} placeholder="Item price"/>
        <select name="status" type="text" value={item.status} onChange={(e) => this.handleChange(e, key)} placeholder="Item Status">
          <option value="available">Available!</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea type="text" name="desc" value={item.desc} onChange={(e) => this.handleChange(e, key)} placeholder="Item Desc"></textarea>
        <input type="text" name="image" value={item.image} onChange={(e) => this.handleChange(e, key)} placeholder="Item Image"/>
      </div>
    )
  }

  render(){
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.items).map(this.renderInventory)}
        <AddToInventory addItem={this.props.addItem} />
        <button onClick={this.props.loadSamples}>Load Sample Items</button>
      </div>
    )
  }
}

export default Inventory;