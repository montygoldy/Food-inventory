import React from 'react';
import '../css/storePicker.scss';

class StorePicker extends React.Component{
  render(){
    return (
      <form className="store-selector">
        <h2>Please enter a Store</h2>
        <input type="text" placeholder="Store Name" required/>
        <button type="submit">Visit Store</button>
      </form>
    )
  }
}

export default StorePicker;