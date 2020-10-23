import cn from 'classnames';
import React, { ReactNode } from 'react';

import { ButtonAppearance } from '../../../types';
import classNames from './index.module.css';

const Button = ({
  appearance = ButtonAppearance.primary,
  children,
  type = 'submit',
  onClick,
}: ButtonProps) => (
  <button className={cn(classNames.button, classNames[appearance])} type={type} onClick={onClick}>
    {children}
  </button>
);
export default Button;

type ButtonProps = {
  children?: ReactNode;
  appearance?: ButtonAppearance;
  type?: 'submit' | 'button' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any;
};
