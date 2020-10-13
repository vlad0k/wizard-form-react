import React, { ReactNode } from 'react';
import classNames from './index.module.css';
import classNamesCombine from 'classnames';
import { ButtonAppearance } from '../../../types';

const Button = ({
  appearance = ButtonAppearance.primary,
  children,
  type = 'submit',
  onClick,
}: ButtonProps) => {
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
  appearance?: ButtonAppearance;
  type?: 'submit' | 'button' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any;
};
