import React, { ReactNode } from "react";
import classNames from "./index.module.css";
import classNamesCombine from "classnames";

type ButtonProps = {
  children?: ReactNode;
  type?: "primary" | "secondary" | "text";
  submit?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any;
};

const Button = ({
  type = "primary",
  children,
  submit = false,
  onClick,
}: ButtonProps) => {
  const buttonClassNames = classNamesCombine({
    [classNames.button]: true,
    [classNames.primary]: type === "primary",
    [classNames.secondary]: type === "secondary",
    [classNames.text]: type === "text",
  });
  return (
    <button
      className={buttonClassNames}
      type={submit ? "submit" : "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
