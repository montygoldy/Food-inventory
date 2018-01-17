import React from 'react';
import '../css/inventory.scss';
import AddToInventory from './AddToInventory';

class Inventory extends React.Component{
  render(){
    return (
      <div>
        <h2>Inventory</h2>
        <AddToInventory />
      </div>
    )
  }
}

export default Inventory;