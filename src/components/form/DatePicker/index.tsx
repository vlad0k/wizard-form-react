import React, { useState } from "react";

import { Field, FieldProps } from "formik";
import Calendar, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classNames from "./index.module.css";
import Button from "../../ui/Button";

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
            // weekDayClassName={() => classNames["wd"]}
            // className={classNames["cn"]}
            // popperClassName={classNames["pp"]}
            // wrapperClassName={classNames["wc"]}
            // dayClassName={(date) => classNames.day}
          />
        );
      }}
    </Field>
  );
};

export default DatePicker;
