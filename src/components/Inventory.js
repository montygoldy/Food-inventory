import React from 'react';
import AddToInventory from './AddToInventory';
import base from '../base';

class Inventory extends React.Component{
  constructor(){
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      uid: null,
      owner: null
    }
  }

  componentDidMount(){
    base.onAuth((user) => {
      if(user){
        this.authHandler(null, { user })
      }
    });
  }

  handleChange(e, key){
    const item = this.props.items[key];
    const updatedItem = {...item, [e.target.name]: e.target.value}
    this.props.updateItem(key, updatedItem);
  }

  authenticate(provider){
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout(){
    base.unauth();
    this.setState({ uid: null });
  }

  authHandler(err, authData){
    if(err){
      console.error(err);
      return
    }

    const storeRef = base.database().ref(this.props.storeId);
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};
      if(!data.owner){
        storeRef.set({
          owner: authData.user.uid
        });
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      });
    })
  }

  renderLogin(){
    return(
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="facebook" onClick={() => this.authenticate('facebook')}>Log in With Facebook</button>
        <button className="facebook" onClick={() => this.authenticate('twitter')}>Log in With Twitter</button>
        <button className="facebook" onClick={() => this.authenticate('github')}>Log in With Github</button>
      </nav>
    )
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
        <button onClick={() => this.props.removeItem(key)}>Remove Item</button>
      </div>
    )
  }

  render(){
    const logout = <button onClick={this.logout}>Log Out!</button>

    if(!this.state.uid){
      return <div>{this.renderLogin()}</div>
    }

    if(this.state.uid !== this.state.owner){
      return (<div>Sorry, not the owner of the store {logout}</div>
      )
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.items).map(this.renderInventory)}
        <AddToInventory addItem={this.props.addItem} />
        <button onClick={this.props.loadSamples}>Load Sample Items</button>
      </div>
    )
  }
}

Inventory.propTypes = {
  items: React.PropTypes.object.isRequired,
  updateItem: React.PropTypes.func.isRequired,
  removeItem: React.PropTypes.func.isRequired,
  addItem: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  storeId: React.PropTypes.string.isRequired
}


export default Inventory;