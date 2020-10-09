import React, { useState } from 'react';
import classNames from './index.module.css';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import db from '../../db/db';
import Avatar from '../ui/Avatar';
import EditIcon from '../../assets/icons/Edit.svg';
import DeleteIcon from '../../assets/icons/Close.svg';
import { IndexableType, Table } from 'dexie';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../redux/store';
import { importUsers, UserType } from '../../redux/usersListReducer';

const UsersList = () => {
  const users = useSelector((state: StateType) => state.users.users);
  const dispatch = useDispatch();
  const setUsers = (users: UserType[]) => dispatch(importUsers(users));
  const [isDeteling, setIsDeteling] = useState<IndexableType>('');

  const userDeleteMode = () => {
    setIsDeteling('');
    document.removeEventListener('click', userDeleteMode);
  };
  const getUsers = () => {
    db.table('users')
      .toArray()
      .then((users: any[]) => setUsers(users ? users : []));
  };

  const deleteUser = (id: number | string) => {
    setIsDeteling(id);
    document.addEventListener('click', userDeleteMode);
  };

  const approveDelete = () => {
    db.table('users').delete(isDeteling);
    getUsers();
    document.removeEventListener('click', userDeleteMode);
  };

  if (users.length === 0) getUsers();
  return (
    <div>
      <table className={classNames.table} cellSpacing={0}>
        <tr>
          <th colSpan={2} />
          <th>name</th>
          <th>company</th>
          <th>contacts</th>
          <th>last update</th>
          <th colSpan={2} />
        </tr>
        {users.map(
          ({ id, username, firstname, lastname, company, email, avatar }: any, i: number) => {
            const avatarSrc = avatar ? URL.createObjectURL(avatar) : undefined;
            return (
              <tr key={id} className={isDeteling === id ? classNames.isDeleting : ''}>
                <td>{id}</td>
                <td>
                  <Avatar size="small" image={avatarSrc} />
                </td>
                <td>
                  <div>
                    <Link to={`/users/${id}`}>
                      {firstname} {lastname}
                    </Link>
                  </div>
                  <span>{username}</span>
                </td>
                <td>{company}</td>
                <td>{email}</td>
                <td>3 month ago</td>
                {isDeteling !== id && (
                  <>
                    <td>
                      <Link to={`/edit/${id}`}>
                        <Button appearance={'text'}>
                          <img src={EditIcon} alt={`edit ${username}`} />
                        </Button>
                      </Link>
                    </td>
                    <td>
                      <Button appearance={'text'} onClick={() => deleteUser(id)}>
                        <img src={DeleteIcon} alt={`delete ${username}`} />
                      </Button>
                    </td>
                  </>
                )}
                {isDeteling === id && (
                  <>
                    <td colSpan={2} />
                    <div className={classNames.deleteButton}>
                      <Button appearance={'delete'} onClick={approveDelete}>
                        × delete
                      </Button>
                    </div>
                  </>
                )}
              </tr>
            );
          },
        )}
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
