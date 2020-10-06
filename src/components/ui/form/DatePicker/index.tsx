import React, { useState } from "react";

import { Field, FieldProps } from "formik";
import Calendar from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DatePickerProps = {
  name: string;
};

const DatePicker = ({ name }: DatePickerProps) => {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <Field name={"name"}>
      {({ field, form }: FieldProps) => {
        const calendarChangeHandler = (date: Date) => {
          setDate(date);
          form.setFieldValue(field.name, date ? date.toDateString() : "");
        };
        return (
          <Calendar
            selected={date}
            onChange={calendarChangeHandler}
            dateFormat={"dd-yy-MM"}
            maxDate={new Date()}
            isClearable
          />
        );
      }}
    </Field>
  );
};

export default DatePicker;
