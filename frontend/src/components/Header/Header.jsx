import React, { useState } from 'react';
import HeaderView from './HeaderView.jsx';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return <HeaderView isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}  />;
};

export default Header;