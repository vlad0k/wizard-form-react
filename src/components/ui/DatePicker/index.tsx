import React, { useState } from 'react';
import classNames from './index.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import { ErrorMessage, Field, FieldProps } from 'formik';
import Calendar from 'react-datepicker';
import FieldError from '../FieldError';

type DatePickerProps = {
  name: string;
};

const DatePicker = ({ name }: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <>
      <Field name={name}>
        {({ field, form, meta }: FieldProps) => {
          setDate(field.value);
          console.log(meta.error);
          const calendarChangeHandler = (date: Date) => {
            setDate(date);
            form.setFieldValue(field.name, date);
          };
          return (
            <>
              <span className={classNames.label}>Birth Date</span>
              <Calendar
                selected={date}
                onChange={calendarChangeHandler}
                dateFormat="dd-yy-MM"
                isClearable
                className={classNames.datePicker}
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
