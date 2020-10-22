import React from 'react';
import classNames from './index.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import './calenar.css';
import { Field, FieldProps } from 'formik';
import Calendar from 'react-datepicker';
import FieldError from '../FieldError';
import cn from 'classnames';
import calendarIcon from '../../../assets/icons/calendar.svg';

type DatePickerProps = {
  name: string;
};

const DatePicker = ({ name }: DatePickerProps) => {
  return (
    <>
      <Field name={name}>
        {({ field: { value }, form: { setFieldValue, errors, touched } }: FieldProps) => {
          const calendarChangeHandler = (date: Date) => {
            setFieldValue(name, date);
          };
          return (
            <div className={classNames.wrapper}>
              <span className={classNames.label}>Birth Date</span>
              <Calendar
                selected={value}
                onChange={calendarChangeHandler}
                dateFormat="dd/MM/yy"
                className={cn(classNames.datePicker, {
                  [classNames.errorBorder]: errors[name] && touched[name],
                })}
                maxDate={new Date()}
              />
              <img className={classNames.icon} src={calendarIcon} alt="" />
            </div>
          );
        }}
      </Field>
      <FieldError name={name} />
    </>
  );
};

export default DatePicker;
