import React from "react";
import classNames from "./index.module.css";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

const UsersList = () => {
  return (
    <div>
      <table className={classNames.table} cellSpacing={0}>
        <thead>
          <th />
          <th>name</th>
          <th>company</th>
          <th>contacts</th>
          <th>last update</th>
          <th />
          <th />
        </thead>
      </table>
      <div className={classNames.empty}>
        <span>No users here :(</span>
        <Link to={"/new"}>
          <Button>Create new user</Button>
        </Link>
      </div>
    </div>
  );
};

export default UsersList;
