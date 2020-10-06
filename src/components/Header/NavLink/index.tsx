import React from "react";
import classNames from "./index.module.css";
import { NavLink as ReactRouterNavLink } from "react-router-dom";

const NavLink = ({ to, name, icon }: NavLinkProps) => {
  return (
    <ReactRouterNavLink
      to={to}
      className={classNames.link}
      activeClassName={classNames.activeLink}
    >
      <img src={icon} alt="" />
      <span>{name}</span>
    </ReactRouterNavLink>
  );
};

export default NavLink;

type NavLinkProps = {
  to: string;
  name: string;
  icon: string;
};
