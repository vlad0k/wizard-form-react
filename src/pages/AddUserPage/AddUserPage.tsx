import React, { useState } from "react";
import classNames from "./AddUserPage.module.css";

import cn from "classnames";

import TopOfTheForm from "../../components/TopOfTheForm/TopOfTheForm";
import Avatar from "../../components/Avatar/Avatar";
import AccountForm from "../../components/AccountForm/AccountForm";

const AddUserPage = () => {
  const [pressed, setPressed] = useState(false);

  const mouseDownHandler = () => {
    setPressed(true);
  };
  const mouseUpHandler = () => {
    setPressed(false);
  };

  return (
    <div className={classNames.addUserPage}>
      <h1>Adding new user</h1>
      <TopOfTheForm />
      <div className={classNames.rectangle}>
        <div className={classNames.addUserPhoto}>
          <Avatar />

          <label
            htmlFor={"profileimage"}
            className={cn({
              [classNames.upload]: true,
              [classNames.pressed]: pressed,
            })}
            onMouseDown={mouseDownHandler}
            onMouseUp={mouseUpHandler}
          >
            +add avatar
            <input type={"file"} name={"profileimage"} id={"profileimage"} />
          </label>
        </div>

        <div>
          <AccountForm />
        </div>
      </div>
    </div>
  );
};

export default AddUserPage;
