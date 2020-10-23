import { ErrorMessage } from 'formik';
import React, { FC } from 'react';

import classNames from './index.module.css';

const FieldError: FC<FieldErrorProps> = ({ name }) => {
  return (
    <div className={classNames.error}>
      <ErrorMessage name={name} />
    </div>
  );
};

export default FieldError;

type FieldErrorProps = {
  name: string;
};
