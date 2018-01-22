import React from 'react';
import '../css/inventory.css'

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
    this.props.addItem(item);
    this.addForm.reset();
  }

  render(){
    return (
      <div>
        <h2>Add To Inventory</h2>
        <form ref={(input) => this.addForm = input}className="add-stock" onSubmit={this.createItem}>
          <div className="form_control">
            <input ref={(input) => this.name = input} type="text" placeholder="Name" required/>
            <input ref={(input) => this.price = input} type="text" placeholder="Price" required/>
          </div>
          <div className="form_control">
            <select ref={(input) => this.status = input} required>
              <option value="available">Available</option>
              <option value="unavailable">Sold Out</option>
            </select>
            <input  ref={(input) => this.image = input} type="text" placeholder="Image" required/>
          </div>
          <div className="form_control">
            <textarea ref={(input) => this.desc = input} placeholder="Description" required></textarea>
          </div>
          <div className="form_submit">
            <button type="submit"><i className="fa fa-plus" aria-hidden="true"></i> Add Item</button>
          </div>
        </form>
      </div>
    )
  }
}

AddToInventory.propTypes = {
  addItem: React.PropTypes.func.isRequired
}

export default AddToInventory;