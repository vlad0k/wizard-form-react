import React, { ReactNode } from 'react';
import classNames from './index.module.css';
import classNamesCombine from 'classnames';

const Button = ({ appearance = 'primary', children, type = 'submit', onClick }: ButtonProps) => {
  const buttonClassNames = classNamesCombine(classNames.button, classNames[appearance]);
  return (
    <button className={buttonClassNames} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

type ButtonProps = {
  children?: ReactNode;
  appearance?: 'primary' | 'secondary' | 'text' | 'finish' | 'delete';
  type?: 'submit' | 'button' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any;
};
