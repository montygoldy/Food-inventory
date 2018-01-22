import React from 'react';
import AddToInventory from './AddToInventory';
import base from '../base';
import '../css/inventory.css';


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
    const { showing } = this.state;
    return(
      <nav className="login">
        <h3>Sign in to manage your store's inventory <button onClick={() => this.setState({ showing: !showing })} id="sign_in">SIGN IN</button></h3>
        { showing && (
        <div className="social_icons">
          <button className="facebook" onClick={() => this.authenticate('facebook')}><i className="fa fa-facebook" aria-hidden="true"></i> Log in With Facebook</button>
          <button className="twitter" onClick={() => this.authenticate('twitter')}><i className="fa fa-twitter" aria-hidden="true"></i> Log in With Twitter</button>
          <button className="github" onClick={() => this.authenticate('github')}><i className="fa fa-github" aria-hidden="true"></i> Log in With Github</button>
        </div>
        )}
      </nav>
    )
  }

  renderInventory(key){
    const item = this.props.items[key];
    return(
      <div className="item-edit" key={key}>
        <div className="form_wrapper">
          <div className="form_control">
            <input type="text" name="name" value={item.name} onChange={(e) => this.handleChange(e, key)} placeholder="Item Name"/>
            <input type="text" name="price" value={item.price} onChange={(e) => this.handleChange(e, key)} placeholder="Item price"/>
            <select name="status" type="text" value={item.status} onChange={(e) => this.handleChange(e, key)} placeholder="Item Status">
              <option value="available">Available!</option>
              <option value="unavailable">Sold Out</option>
            </select>
             <input type="text" name="image" value={item.image} onChange={(e) => this.handleChange(e, key)} placeholder="Item Image"/>
          </div>
          <div className="form_control">
            <textarea type="text" name="desc" value={item.desc} onChange={(e) => this.handleChange(e, key)} placeholder="Item Desc"></textarea>
            <button onClick={() => this.props.removeItem(key)} className="remove_item"><i className="fa fa-trash" aria-hidden="true"></i> Remove Item</button>
          </div>
        </div>
      </div>
    )
  }

  render(){
    const logout = <button onClick={this.logout} className="logout">Log Out!</button>

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
        <button onClick={this.props.loadSamples} className="load_samples">Load Sample Items</button>
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