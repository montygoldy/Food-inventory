import React from 'react';
import "../css/storePicker.css";
import "../css/style.css";
import Video from "../css/images/Thirst.mp4"
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
      <div>
        <video className="background-video" loop autoPlay>
          <source src={Video} type="video/mp4" />

          Your browser does not support the video tag.
        </video>
        <form className="store-selector" onSubmit={this.goToStore}>
          <div className="form_wrapper">
            <h2>Please enter a store name</h2>
            <div className="store_input_group">
              <input type="text" ref={(input) => {this.storeInput = input}} placeholder="Store name" required/>
              <button type="submit">Visit Store</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;