import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';
import classNames from './index.module.css';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header className={classNames.head}>
      <Link to="/">
        <Logo />
      </Link>
      <Navbar />
    </header>
  );
};

export default Header;
