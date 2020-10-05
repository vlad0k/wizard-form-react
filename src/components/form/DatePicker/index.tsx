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
    <Calendar
      selected={date}
      onChange={(date: Date) => setDate(date)}
      dateFormat={"dd-yy-MM"}
      maxDate={new Date()}
      isClearable
      renderCustomHeader={(props) => {
        const { date } = props;
        return (
          <div className={classNames["header"]}>
            <Button type={"text"}>{"<"}</Button>
            <div>
              {date.getMonth()} {date.getFullYear()}
            </div>
            <Button type={"text"}>{">"}</Button>
          </div>
        );
      }}
      weekDayClassName={() => classNames["wd"]}
      className={classNames["cn"]}
      popperClassName={classNames["pp"]}
      wrapperClassName={classNames["wc"]}
      dayClassName={(date) => classNames.day}
    />
  );
};

export default DatePicker;
