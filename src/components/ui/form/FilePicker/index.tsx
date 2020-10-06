import React, { ReactNode, useState } from "react";
import cn from "classnames";
import classNames from "./index.module.css";

const FilePicker = ({ name, children }: FilePickerProps) => {
  const [pressed, isPressed] = useState(false);

  const mouseDownHandler = () => {
    isPressed(true);
  };
  const mouseUpHandler = () => {
    isPressed(false);
  };

  return (
    <label
      htmlFor={name}
      className={cn(classNames.upload, {
        [classNames.pressed]: pressed,
      })}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
    >
      {children}
      <input type="file" name={name} id={name} />
    </label>
  );
};

export default FilePicker;

type FilePickerProps = {
  children: ReactNode;
  name: string;
};
