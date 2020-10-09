import React, { FC } from 'react';
import classNames from './index.module.css';
import Avatar from '../ui/Avatar';
import ValuesGroup from './ValuesGroup';
import { UserType } from '../../types';

type TemplateType = {
  key: string;
  value: {
    name: string;
    value: string | string[] | null | undefined;
  }[];
};

const generatePageTemplate = ({
  username,
  hobbies,
  phoneNumbers,
  company,
  adress,
  lastname,
  firstname,
  birthdate,
  email,
  facebook,
  fax,
  skills,
}: UserType): TemplateType[] => [
  {
    key: 'Account',
    value: [
      { name: 'User Name', value: username },
      { name: 'password', value: '**********' },
    ],
  },
  {
    key: 'Personal',
    value: [
      { name: 'First Name', value: firstname },
      { name: 'Last Name', value: lastname },
      { name: 'Birth Date', value: birthdate && birthdate.toLocaleDateString() },
      { name: 'Email', value: email },
      { name: 'Adress', value: adress },
    ],
  },
  {
    key: 'Contacts',
    value: [
      { name: 'Company', value: company },
      { name: 'Fax', value: fax },
      { name: 'Facebook Link', value: facebook },
      { name: 'Phone', value: phoneNumbers },
    ],
  },
  {
    key: 'Capabilities',
    value: [
      { name: 'Skills', value: skills },
      { name: 'Hobbies', value: hobbies },
    ],
  },
];

const UserPage: FC<UserPagePropsType> = ({ user }) => {
  const { avatar, id } = user;
  const avatarUrl = avatar ? URL.createObjectURL(avatar) : undefined;

  return (
    <div className={classNames.userPage}>
      <Avatar image={avatarUrl} size="large" />
      <div>
        {generatePageTemplate(user).map(({ key, value }: TemplateType) => (
          <ValuesGroup groupName={key} values={value} id={id} />
        ))}
      </div>
    </div>
  );
};

export default UserPage;

type UserPagePropsType = {
  user: UserType;
};
