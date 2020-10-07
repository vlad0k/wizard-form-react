import React, { useState } from 'react';
import classNames from './index.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Field, FieldProps } from 'formik';
import Calendar from 'react-datepicker';

type DatePickerProps = {
  name: string;
};

const DatePicker = ({ name }: DatePickerProps) => {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        const calendarChangeHandler = (date: Date) => {
          setDate(date);
          form.setFieldValue(field.name, date ? date.toDateString() : '');
        };
        return (
          <>
            <span className={classNames.label}>Birth Date</span>
            <Calendar
              selected={date}
              onChange={calendarChangeHandler}
              dateFormat="dd-yy-MM"
              maxDate={new Date()}
              isClearable
              className={classNames.datePicker}
            />
          </>
        );
      }}
    </Field>
  );
};

export default DatePicker;
