import React from 'react';
import classNames from './index.module.css';
import Logo from '../Logo/Logo';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

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
