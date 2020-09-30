import React from "react";
import classNames from "./AddUserPage.module.css";

import addIcon from "../../assets/icons/add.svg";

import TopOfTheForm from "../../components/TopOfTheForm/TopOfTheForm";
import Avatar from "../../components/Avatar/Avatar";
import AccountForm from "../../components/AccountForm/AccountForm";

const AddUserPage = () => {
  return (
    <div className={classNames.addUserPage}>
      <h1>Adding new user</h1>
      <TopOfTheForm />
      <div className={classNames.rectangle}>
        <div className={classNames.addUserPhoto}>
          <Avatar />

          <label htmlFor={"profileimage"} className={classNames.upload}>
            <img src={addIcon} />
            add avatar
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
