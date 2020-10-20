import React, { useEffect, useState } from 'react';
import classNames from './index.module.css';
import PageLayout from '../../components/PageLayout';
import { useDispatch } from 'react-redux';
import Button from '../../components/ui/Button';
import { generateUsers } from '../../redux/usersListReducer';
import Search from '../../components/Search';

const IndexPage = () => {
  const [isJustGenerated, setIsJustGenerated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => setIsJustGenerated(false), 5000);
  }, [isJustGenerated]);

  const generateButtonHandler = () => {
    !isJustGenerated && dispatch(generateUsers());
    setIsJustGenerated(true);
  };
  return (
    <PageLayout name="Search Users">
      <Search />
      <div className={classNames.generate}>
        <Button onClick={generateButtonHandler}>Generate Users</Button>
        {isJustGenerated && <span>generated!</span>}
      </div>
    </PageLayout>
  );
};

export default IndexPage;
