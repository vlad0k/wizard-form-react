import React, { FC, useState } from 'react';
import classNames from './index.module.css';
import { AvatarSize, ButtonAppearance, UserType } from '../../../types';
import Avatar from '../../ui/Avatar';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import EditIcon from '../../../assets/icons/Edit.svg';
import DeleteIcon from '../../../assets/icons/Close.svg';
import { useDispatch } from 'react-redux';
import { IndexableType } from 'dexie';
import { deleteUser } from '../../../redux/usersListReducer';
import cn from 'classnames';
import moment from 'moment';

const Table: FC<TablePropsType> = ({ users, stripped = false }) => {
  const dispatch = useDispatch();
  const [isDeteling, setIsDeteling] = useState<IndexableType>('');

  const userDeleteMode = () => {
    setIsDeteling('');
    document.removeEventListener('click', userDeleteMode);
  };

  const deleteUserButtonHandler = (id: number | string) => {
    setIsDeteling(id);
    //TODO remove event listener from func
    document.addEventListener('click', userDeleteMode);
  };

  const approveDeleteButtonHandler = (id: IndexableType) => {
    dispatch(deleteUser(id));
    document.removeEventListener('click', userDeleteMode);
  };

  return (
    <table className={cn(classNames.table, { [classNames.stripped]: stripped })} cellSpacing={0}>
      <thead>
        <tr>
          <th colSpan={2} />
          <th>name</th>
          <th>company</th>
          <th>contacts</th>
          <th>last update</th>
          <th colSpan={2} />
        </tr>
      </thead>
      <tbody>
        {users.map(
          (
            {
              id,
              username,
              firstname,
              lastname,
              company,
              email,
              avatar,
              phoneNumbers,
              lastUpdated,
            },
            i: number,
          ) => {
            return (
              <tr key={id} className={isDeteling === id ? classNames.isDeleting : ''}>
                <td></td>
                <td>
                  <Avatar
                    size={AvatarSize.small}
                    image={avatar ? URL.createObjectURL(avatar) : undefined}
                  />
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
                <td>{phoneNumbers[0] ? phoneNumbers[0] : email}</td>
                <td>{moment(lastUpdated).fromNow()}</td>
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
