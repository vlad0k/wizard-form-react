import React, { ReactNode, useState } from "react";
import cn from "classnames";
import classNames from "./index.module.css";

type FilePickerProps = {
  children: ReactNode;
  name: string;
};

const FilePicker = ({ name, children }: FilePickerProps) => {
  const [pressed, setPressed] = useState(false);

  const mouseDownHandler = () => {
    setPressed(true);
  };
  const mouseUpHandler = () => {
    setPressed(false);
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
