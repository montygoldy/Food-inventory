import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Item from "./Item";
import sampleData from '../sample-data';
class App extends React.Component{
  constructor(){
    super();
    this.addItem = this.addItem.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
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

  loadSamples(){
    this.setState({
      items: sampleData
    })
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
              .map(key => <Item key={key} details={this.state.items[key]}/>)
          }
        </ul>
        <Order />
        <Inventory addItem={this.addItem} loadSamples={this.loadSamples}/>
      </div>
    )
  }
}

export default App;