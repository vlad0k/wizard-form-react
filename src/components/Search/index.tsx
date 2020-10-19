import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import classNames from './index.module.css';

import { debounce } from 'lodash';
import { searchUsers } from '../../db';
import { UserType } from '../../types';
import { Link } from 'react-router-dom';
import cn from 'classnames/dedupe';

const Search: FC = () => {
  const [value, setValue] = useState<string>('');
  const [foundUsers, setFoundUsers] = useState<UserType[]>([]);
  const [isResultsShow, setIsResultsShow] = useState<boolean>(false);

  useEffect(() => {
    const searchInDb = debounce(async () => {
      const newUsers = await searchUsers(value);
      setFoundUsers(newUsers);
      setIsResultsShow(true);
    }, 200);
    searchInDb();
  }, [value]);

  return (
    <div className={classNames.wrapper}>
      <input
        className={classNames.searchBar}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
        onFocus={() => {}}
        onBlur={() => setIsResultsShow(false)}
      />
      {isResultsShow && value !== '' && (
        <ul className={classNames.resultsList}>
          {foundUsers.length === 0 && (
            <li className={cn(classNames.result, classNames.noResult)}>
              <span>-- no users found --</span>
            </li>
          )}
          {foundUsers.map(({ id, username, firstname, lastname }) => (
            <li className={classNames.result}>
              <Link to={`/users/${id}`}>
                <div className={classNames.name}>
                  {firstname} {lastname}
                </div>
                <div>@{username}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
