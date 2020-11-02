import React, { ChangeEvent, FC } from 'react';

import { ButtonAppearance } from '../../types';
import Button from '../ui/Button';
import clearIcon from './../../assets/icons/Close.svg';
import classNames from './index.module.css';

const Search: FC<SeatchPropsType> = ({ searchValue = '', onChange }) => {
  const clearButtonHandler = () => onChange('');

  return (
    <div className={classNames.wrapper}>
      <input
        className={classNames.searchBar}
        value={searchValue}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
      />
      <div className={classNames.clearButtonWrapper}>
        {searchValue && (
          <Button appearance={ButtonAppearance.text} onClick={clearButtonHandler}>
            <img src={clearIcon} />
          </Button>
        )}
      </div>
    </div>
  );
};

type SeatchPropsType = {
  searchValue: string;
  onChange: (newValue: string) => void;
};

export default Search;
