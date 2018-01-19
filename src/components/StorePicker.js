import React from 'react';
import '../css/storePicker.scss';
import { getFunName } from '../helpers';

class StorePicker extends React.Component{

  constructor(){
    super()
    this.goToStore = this.goToStore.bind(this);
  }

  goToStore(e){
    e.preventDefault();
    const storeId = this.storeInput.value;
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render(){
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a Store</h2>
        <input type="text" ref={(input) => {this.storeInput = input}} placeholder="Store Name" defaultValue={getFunName()}  required/>
        <button type="submit">Visit Store</button>
      </form>
    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;