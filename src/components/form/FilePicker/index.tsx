import React, { ReactNode, useState } from "react";
import cn from "classnames";
import classNames from "./index.module.css";

type FilePickerProps = {
  children: ReactNode;
};

const FilePicker = ({ children }: FilePickerProps) => {
  const [pressed, setPressed] = useState(false);

  const mouseDownHandler = () => {
    setPressed(true);
  };
  const mouseUpHandler = () => {
    setPressed(false);
  };

  return (
    <label
      htmlFor={"profileimage"}
      className={cn({
        [classNames.upload]: true,
        [classNames.pressed]: pressed,
      })}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
    >
      {children}
      <input type={"file"} name={"profileimage"} id={"profileimage"} />
    </label>
  );
};

export default FilePicker;
