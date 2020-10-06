import React, { ReactNode, useState } from "react";
import cn from "classnames";
import classNames from "./index.module.css";

const FilePicker = ({ name, children }: FilePickerProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const mouseDownHandler = () => {
    setIsPressed(true);
  };
  const mouseUpHandler = () => {
    setIsPressed(false);
  };

  return (
    <label
      htmlFor={name}
      className={cn(classNames.upload, {
        [classNames.pressed]: isPressed,
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
