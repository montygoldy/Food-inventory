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
    this.updateItem  = this.updateItem.bind(this);
    this.removeItem  = this.removeItem.bind(this);
    this.removeOrder  = this.removeOrder.bind(this);
    this.state = {
      items: {},
      order: {}
    }
  }

  componentWillMount(){
    this.ref = base.syncState(`${this.props.params.storeId}/items`, {
      context: this,
      state: 'items'
    });

    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
    if(localStorageRef){
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState){
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
  }

  addItem(item){
    const items = {...this.state.fishes};
    const timestamp = Date.now();
    items[`item - ${timestamp}`] = item;
    this.setState({ items })
  }

  updateItem(key, updatedItem){
    const items = {...this.state.items};
    items[key] = updatedItem;
    this.setState({ items });
  }

  removeItem(key){
    const items = {...this.state.items};
    items[key] = null;
    this.setState({ items })
  }

  removeOrder(key){
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order });
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
      <div className="wrapper">
        <div className="menu">
          <Header />
        </div>
        <div className="item_order_wrapper">
          <section className="items_box">
            <ul className="list-of-items">
              {
                Object
                  .keys(this.state.items)
                  // cannot use key for add to order as it is explicit to react so need to create index just for this purpose
                  .map(key => <Item key={key} index={key} details={this.state.items[key]} addToOrder={this.addToOrder} />)
              }
            </ul>
          </section>
          <section className="order_box">
            <Order items={this.state.items} order={this.state.order} params={this.props.params} removeOrder={this.removeOrder} />
          </section>
        </div>
        <Inventory addItem={this.addItem} loadSamples={this.loadSamples} items={this.state.items} updateItem={this.updateItem} removeItem={this.removeItem} storeId={this.props.params.storeId} />

      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;