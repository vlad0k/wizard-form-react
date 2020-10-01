import React, { useState } from "react";
import classNames from "./AddUserPage.module.css";

import cn from "classnames";

import TopOfTheForm from "../../components/TopOfTheForm/TopOfTheForm";
import Avatar from "../../components/Avatar/Avatar";
import AccountForm from "../../components/AccountForm/AccountForm";
import { useSelector, useDispatch } from "react-redux";
import { StateType } from "../../redux/store";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import { selectStep } from "../../redux/addFormReducer";

const AddUserPage = () => {
  const [pressed, setPressed] = useState(false);

  const dispatch = useDispatch();
  let currentStep: number = useSelector(
    (state: StateType) => state.addForm.currentStep
  );
  const mouseDownHandler = () => {
    setPressed(true);
  };
  const mouseUpHandler = () => {
    setPressed(false);
  };

  return (
    <div className={classNames.addUserPage}>
      <h1>Adding new user</h1>
      <TopOfTheForm value={currentStep} />

      {currentStep === 1 && (
        <div
          className={[classNames.rectangle, classNames.twoColumns].join(" ")}
        >
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

          <div style={{ height: "100%" }}>
            <AccountForm />
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className={classNames.rectangle}>
          <ProfileForm />
        </div>
      )}

      <select
        value={currentStep}
        onChange={(e: any) => dispatch(selectStep(+e.target.value))}
      >
        <option value={1}>1. Account</option>
        <option value={2}>2. Profile</option>
        <option value={3}>3. Contacts</option>
        <option value={4}>4. Capabilities</option>
      </select>
    </div>
  );
};

export default AddUserPage;
