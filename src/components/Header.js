import React from 'react';
import Logo from  "../css/images/logo.png";
const Header = (props) => {
  return (
    <header className="top">
      <img src={Logo} alt="Logo" />
    </header>
  )
}

export default Header;