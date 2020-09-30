import React, { ReactNode } from "react";
import classNames from "./Button.module.css";
import classNamesCombine from "classnames";

type ButtonProps = {
  children?: ReactNode;
  type?: "primary" | "secondary" | "text";
};

const Button = ({ type, children }: ButtonProps) => {
  const buttonClassNames = classNamesCombine({
    [classNames.button]: true,
    [classNames.primary]: !type || type === "primary",
    [classNames.secondary]: type === "secondary",
    [classNames.text]: type === "text",
  });
  return <button className={buttonClassNames}>{children}</button>;
};

export default Button;
