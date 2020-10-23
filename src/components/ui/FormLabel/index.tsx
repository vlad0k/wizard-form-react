import React, { FC } from 'react';

import classNames from './index.module.css';

const FormLabel: FC<FormLabelPropsType> = ({ label }) => {
  return <>{label && <span className={classNames.label}>{label}</span>}</>;
};

type FormLabelPropsType = {
  label?: string;
};

export default FormLabel;
