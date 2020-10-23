import cn from 'classnames';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { searchUsers } from '../../db';
import { AvatarSize, UserType } from '../../types';
import Avatar from '../ui/Avatar';
import classNames from './index.module.css';

const Search: FC = () => {
  const [value, setValue] = useState<string>('');
  const [foundUsers, setFoundUsers] = useState<UserType[]>([]);
  const [isResultsShow, setIsResultsShow] = useState<boolean>(false);

  useEffect(() => {
    const searchInDb = async () => {
      const newUsers = await searchUsers(value);
      setFoundUsers(newUsers);
      setIsResultsShow(true);
    };
    searchInDb();
  }, [value]);

  return (
    <div className={classNames.wrapper}>
      <input
        className={classNames.searchBar}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
        onFocus={() => setIsResultsShow(true)}
        onBlur={() => setTimeout(() => setIsResultsShow(false), 500)}
      />
      {/*TODO убрать setTimeout 500 next pull request*/}
      {isResultsShow && value !== '' && (
        <ul className={classNames.resultsList}>
          {foundUsers.length === 0 && (
            <li className={cn(classNames.result, classNames.noResult)}>
              <span>-- no users found --</span>
            </li>
          )}
          {foundUsers.map(({ id, username, firstname, lastname, avatar }) => (
            <li key={id} className={classNames.result}>
              <Link to={`/users/${id}`}>
                <Avatar imageFile={avatar} size={AvatarSize.small} />
                <div className={classNames.name}>
                  {firstname} {lastname}
                  <div className={classNames.username}>@{username}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
