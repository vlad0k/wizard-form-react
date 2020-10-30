import React, { FC, ReactNode } from 'react';

import classNames from './index.module.css';

const FormLabel: FC<FormLabelPropsType> = ({ label, isRequiredField = false, children }) => {
  return (
    <div className={classNames.wrapper}>
      <div className={classNames.labelContainer}>
        {label && <span className={classNames.label}>{label}</span>}
        {isRequiredField && <span className={classNames.label}>*</span>}
      </div>

      {children}
    </div>
  );
};

type FormLabelPropsType = {
  label?: string;
  isRequiredField?: boolean;
  children: ReactNode;
};

export default FormLabel;
