import 'react-datepicker/dist/react-datepicker.css';
import './calenar.css';

import cn from 'classnames';
import { Field, FieldProps } from 'formik';
import React, { FC } from 'react';
import Calendar from 'react-datepicker';

import calendarIcon from '../../../assets/icons/calendar.svg';
import FieldError from '../FieldError';
import FormLabel from '../FormLabel';
import classNames from './index.module.css';

const DatePicker: FC<DatePickerPropsType> = ({ name, label, isRequiredField = false }) => {
  return (
    <FormLabel label={label} isRequiredField={isRequiredField}>
      <Field name={name}>
        {({ field: { value }, form: { setFieldValue, errors, touched } }: FieldProps) => {
          const calendarChangeHandler = (date: Date) => {
            setFieldValue(name, date);
          };
          return (
            <div className={classNames.wrapper}>
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
    </FormLabel>
  );
};

type DatePickerPropsType = {
  name: string;
  label?: string;
  isRequiredField?: boolean;
};

export default DatePicker;
