import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      items: {},
      order: {}
    }
  }

  render(){
    return (
      <div className="main">
        <div className="menu">
          <Header tagline="My tagline of the site" />
        </div>
        <Order />
        <Inventory />
      </div>
    )
  }
}

export default App;