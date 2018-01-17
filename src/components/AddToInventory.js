import React from 'react';


class AddToInventory extends React.Component{
  constructor(){
    super();
    this.createItem = this.createItem.bind(this);
  }
  createItem(e){
    e.preventDefault();
    const item ={
      name: this.name.value,
      price: this.price.value,
      status: this.status.value,
      desc: this.desc.value,
      image: this.image.value
    }

    console.log(item);
  }

  render(){
    return (
      <div>
        <h2>Add To Inventory</h2>
        <form className="add-stock" onSubmit={this.createItem}>
          <input ref={(input) => this.name = input} type="text" placeholder="Stock Name"/>
          <input ref={(input) => this.price = input} type="text" placeholder="Stock Price"/>
          <select ref={(input) => this.status = input}>
            <option value="available">Available</option>
            <option value="unavailable">Sold Out</option>
          </select>
          <textarea ref={(input) => this.desc = input} placeholder="Stock Desc"></textarea>
          <input  ref={(input) => this.image = input} type="text" placeholder="Stock Image"/>
          <button type="submit">Add Item</button>
        </form>
      </div>
    )
  }
}

export default AddToInventory;