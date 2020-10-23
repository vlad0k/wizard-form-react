import React from "react";

import addUsersIcon from "../../../assets/icons/add-users.svg";
import listOfUsersIcon from "../../../assets/icons/list-of-users.svg";
import NavLink from "../NavLink";
import classNames from "./index.module.css";

const Navbar = () => {
  return (
    <nav className={classNames.navbar}>
      <NavLink to="/new" name="Add new user" icon={addUsersIcon} />
      <NavLink to="/users" name="List of users" icon={listOfUsersIcon} />
    </nav>
  );
};

export default Navbar;
