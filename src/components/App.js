import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component{
  constructor(){
    super();
    this.addItem = this.addItem.bind(this);
    this.state = {
      items: {},
      order: {}
    }
  }

  addItem(item){
    const items = {...this.state.fishes};
    const timestamp = Date.now();
    items[`item - ${timestamp}`] = item;
    this.setState({ items })
  }

  render(){
    return (
      <div className="main">
        <div className="menu">
          <Header tagline="My tagline of the site" />
        </div>
        <Order />
        <Inventory addItem={this.addItem} />
      </div>
    )
  }
}

export default App;