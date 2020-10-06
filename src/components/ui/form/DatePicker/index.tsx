import React, { useState } from "react";
import Calendar from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classNames from "./index.module.css";
import Button from "../../Button";

type DatePickerProps = {
  name: string;
};

const DatePicker = ({ name }: DatePickerProps) => {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <Calendar
      selected={date}
      onChange={(date: Date) => setDate(date)}
      dateFormat="dd-yy-MM"
      maxDate={new Date()}
      isClearable
      renderCustomHeader={(props) => {
        const { date } = props;
        return (
          <div className={classNames["header"]}>
            <Button type="text"> &#60; </Button>
            <div>
              {date.getMonth()} {date.getFullYear()}
            </div>
            <Button type="text"> &#62; </Button>
          </div>
        );
      }}
      weekDayClassName={() => classNames["wd"]}
      popperClassName={classNames["popper"]}
      wrapperClassName={classNames["wrapper"]}
      dayClassName={(date) => classNames.day}
    />
  );
};

export default DatePicker;
