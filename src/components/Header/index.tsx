import React from "react";
import classNames from "./index.module.css";
import Logo from "../ui/Logo/Logo";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className={classNames.head}>
      <Logo />
      <Navbar />
    </header>
  );
};

export default Header;
