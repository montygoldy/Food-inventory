import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Item from "./Item";
import sampleData from '../sample-data';
import base from '../base';

class App extends React.Component{
  constructor(){
    super();
    this.addItem = this.addItem.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder  = this.addToOrder.bind(this);
    this.state = {
      items: {},
      order: {}
    }
  }

  componentWillMount(){
    this.ref = base.syncState(`${this.props.params.storeId}/items`, {
      context: this,
      state: 'items'
    })
  }


  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  addItem(item){
    const items = {...this.state.fishes};
    const timestamp = Date.now();
    items[`item - ${timestamp}`] = item;
    this.setState({ items })
  }

  loadSamples(){
    this.setState({
      items: sampleData
    })
  }

  addToOrder(key){
    const order = {...this.state.order};
    order[key] = order[key] + 1 || 1;
    this.setState({ order })
  }

  render(){
    return (
      <div className="main">
        <div className="menu">
          <Header tagline="My tagline of the site" />
        </div>
        <ul className="list-of-items">
          {
            Object
              .keys(this.state.items)
              // cannot use key for add to order as it is explicit to react so need to create index just for this purpose
              .map(key => <Item key={key} index={key} details={this.state.items[key]} addToOrder={this.addToOrder} />)
          }
        </ul>
        <Order items={this.state.items} order={this.state.order} />
        <Inventory addItem={this.addItem} loadSamples={this.loadSamples}/>
      </div>
    )
  }
}

export default App;