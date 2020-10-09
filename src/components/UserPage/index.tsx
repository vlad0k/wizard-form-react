import React, { FC } from 'react';
import classNames from './index.module.css';
import { UserType } from '../../redux/usersListReducer';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import editIcon from '../../assets/icons/Edit.svg';
import { Link } from 'react-router-dom';
import ValuesList from './ValuesList';
import ValuesGroup from './ValuesGroup';

type TemplateType = {
  key: string;
  value: {
    name: string;
    value: string | string[] | null | undefined;
  }[];
};

const generatePageTemplate = (user: UserType): TemplateType[] => [
  {
    key: 'Account',
    value: [
      { name: 'User Name', value: user.username },
      { name: 'password', value: '**********' },
    ],
  },
  {
    key: 'Personal',
    value: [
      { name: 'First Name', value: user.firstname },
      { name: 'Last Name', value: user.lastname },
      { name: 'Birth Date', value: user.birthdate && user.birthdate.toLocaleDateString() },
      { name: 'Email', value: user.email },
      { name: 'Adress', value: user.adress },
    ],
  },
  {
    key: 'Contacts',
    value: [
      { name: 'Company', value: user.company },
      { name: 'Fax', value: user.fax },
      { name: 'Facebook Link', value: user.facebook },
      { name: 'Phone', value: user.phoneNumbers },
    ],
  },
  {
    key: 'Capabilities',
    value: [
      { name: 'Skills', value: user.skills },
      { name: 'Hobbies', value: user.hobbies },
    ],
  },
];
const UserPage: FC<UserPagePropsType> = ({ user }) => {
  const avatarUrl = user.avatar ? URL.createObjectURL(user.avatar) : undefined;

  return (
    <div className={classNames.userPage}>
      <Avatar image={avatarUrl} size="large" />
      <div>
        {generatePageTemplate(user).map(({ key, value }: TemplateType) => (
          <ValuesGroup groupName={key} values={value} id={user.id} />
        ))}
      </div>
    </div>
  );
};

export default UserPage;

type UserPagePropsType = {
  user: UserType;
};
