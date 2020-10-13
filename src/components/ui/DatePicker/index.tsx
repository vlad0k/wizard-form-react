import React, { useState } from 'react';
import classNames from './index.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Field, FieldProps } from 'formik';
import Calendar from 'react-datepicker';
import FieldError from '../FieldError';
import InputField from '../InputField';

type DatePickerProps = {
  name: string;
};

const DatePicker = ({ name }: DatePickerProps) => {
  return (
    <>
      <Field name={name}>
        {({ field: { value }, form: { setFieldValue } }: FieldProps) => {
          const calendarChangeHandler = (date: Date) => {
            setFieldValue(name, date);
          };
          return (
            <>
              <span className={classNames.label}>Birth Date</span>
              <Calendar
                selected={value}
                onChange={calendarChangeHandler}
                dateFormat="dd/MM/yy"
                className={classNames.datePicker}
                maxDate={new Date()}
              />
            </>
          );
        }}
      </Field>
      <FieldError name={name} />
    </>
  );
};

export default DatePicker;
