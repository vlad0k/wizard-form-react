import React, { FC } from 'react';

import { AvatarSize, UserType } from '../../types';
import Avatar from '../ui/Avatar';
import classNames from './index.module.css';
import ValuesGroup from './ValuesGroup';

type TemplateType = {
  key: string;
  value: {
    name: string;
    value: string | string[] | null;
  }[];
};

const generatePageTemplate = ({
  username,
  hobbies,
  phoneNumbers,
  company,
  address,
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
      { name: 'Birth Date', value: birthdate ? birthdate.toLocaleDateString() : null },
      { name: 'Email', value: email },
      { name: 'Address', value: address },
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
      { name: 'Skills', value: skills.map((skill) => skill.label) },
      { name: 'Hobbies', value: hobbies },
    ],
  },
];

const UserInfo: FC<UserPagePropsType> = ({ user }) => {
  const { avatar, id } = user;
  return (
    <div className={classNames.userPage}>
      <Avatar imageFile={avatar} size={AvatarSize.large} />
      <div>
        {generatePageTemplate(user).map(({ key, value }: TemplateType, index) => (
          <ValuesGroup index={index} key={key} groupName={key} values={value} id={id} />
        ))}
      </div>
    </div>
  );
};
type UserPagePropsType = {
  user: UserType;
};
export default UserInfo;
