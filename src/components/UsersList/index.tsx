import React, { useState } from 'react';
import classNames from './index.module.css';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import db from '../../db/db';
import Avatar from '../ui/Avatar';
import EditIcon from '../../assets/icons/Edit.svg';
import DeleteIcon from '../../assets/icons/Close.svg';

const UsersList = () => {
  const [users, setUsers] = useState<any>([]);

  const getUsers = async () => {
    setUsers(await db.users.toArray());
  };
  if (users.length === 0) getUsers();
  console.log(users);
  return (
    <div>
      <table className={classNames.table} cellSpacing={0}>
        <thead>
          <th>id</th>
          <th />
          <th>name</th>
          <th>company</th>
          <th>contacts</th>
          <th>last update</th>
          <th colSpan={2} />
        </thead>
        <tbody>
          {users.map(({ id, username, firstname, lastname, company, email, avatar }: any) => {
            const avatarSrc = avatar ? URL.createObjectURL(avatar) : undefined;
            return (
              <tr>
                <td>{id}</td>
                <td>
                  <Avatar small image={avatarSrc} />
                </td>
                <td>
                  <div>
                    {firstname} {lastname}
                  </div>
                  <span>{username}</span>
                </td>
                <td>{company}</td>
                <td>{email}</td>
                <td>3 month ago</td>
                <td>
                  <Button appearance={'text'}>
                    <img src={EditIcon} alt={`edit ${username}`} />
                  </Button>
                </td>
                <td>
                  <Button appearance={'text'}>
                    <img src={DeleteIcon} alt={`delete ${username}`} />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {users.length === 0 && (
        <div className={classNames.empty}>
          <span>No users here :(</span>
          <Link to="/new">
            <Button>Create new user</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UsersList;
