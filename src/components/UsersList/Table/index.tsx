import cn from 'classnames';
import { IndexableType } from 'dexie';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import DeleteIcon from '../../../assets/icons/Close.svg';
import EditIcon from '../../../assets/icons/Edit.svg';
import { deleteUser } from '../../../redux/usersListReducer';
import { AvatarSize, ButtonAppearance, UserType } from '../../../types';
import Avatar from '../../ui/Avatar';
import Button from '../../ui/Button';
import classNames from './index.module.css';

const Table: FC<TablePropsType> = ({ users, stripped = false }) => {
  const dispatch = useDispatch();
  const [isDeteling, setIsDeteling] = useState<IndexableType>('');

  const userDeleteMode = () => {
    setIsDeteling('');
    document.removeEventListener('click', userDeleteMode);
  };

  const deleteUserButtonHandler = (id: number | string) => {
    setIsDeteling(id);
    //TODO remove event listener from func read best practices
    document.addEventListener('click', userDeleteMode);
  };

  const approveDeleteButtonHandler = (id: number) => {
    dispatch(deleteUser(id));
    document.removeEventListener('click', userDeleteMode);
  };

  return (
    <table className={cn(classNames.table, { [classNames.stripped]: stripped })} cellSpacing={0}>
      <thead>
        <tr>
          <th />
          <th>name</th>
          <th>company</th>
          <th>contacts</th>
          <th>last update</th>
          <th colSpan={2} />
        </tr>
      </thead>
      <tbody>
        {users.map(
          ({
            id,
            username,
            firstname,
            lastname,
            company,
            email,
            avatar,
            phoneNumbers: [phoneNumber] = [''],
            updatedAt,
          }: UserType) => {
            return (
              <tr key={id} className={isDeteling === id ? classNames.isDeleting : ''}>
                <td>
                  <Avatar size={AvatarSize.small} imageFile={avatar} />
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
                <td>{phoneNumber || email}</td>
                <td>{moment(updatedAt).fromNow()}</td>
                {isDeteling !== id && (
                  <>
                    <td>
                      <Link to={`/edit/${id}`}>
                        <Button appearance={ButtonAppearance.text}>
                          <img src={EditIcon} alt={`edit ${username}`} />
                        </Button>
                      </Link>
                    </td>
                    <td>
                      <Button
                        appearance={ButtonAppearance.text}
                        onClick={() => deleteUserButtonHandler(id)}
                      >
                        <img src={DeleteIcon} alt={`delete ${username}`} />
                      </Button>
                    </td>
                  </>
                )}
                {isDeteling === id && (
                  <>
                    <td />
                    <td>
                      <div className={classNames.deleteButton}>
                        <Button
                          appearance={ButtonAppearance.delete}
                          onClick={() => approveDeleteButtonHandler(id)}
                        >
                          × delete
                        </Button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            );
          },
        )}
      </tbody>
    </table>
  );
};

export default Table;

type TablePropsType = {
  users: UserType[];
  stripped?: boolean;
};
