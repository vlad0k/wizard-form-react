import React, { FC } from 'react';
import classNames from './index.module.css';
import Avatar from '../ui/Avatar';
import ValuesGroup from './ValuesGroup';
import { AvatarSize, UserType } from '../../types';

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
      { name: 'Birth Date', value: birthdate ? birthdate.toLocaleDateString() : null },
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
      { name: 'Skills', value: skills.map((skill) => skill.label) },
      { name: 'Hobbies', value: hobbies },
    ],
  },
];

const UserInfo: FC<UserPagePropsType> = ({ user }) => {
  const { avatar, id } = user;

  return (
    <div className={classNames.userPage}>
      <Avatar image={avatar ? URL.createObjectURL(avatar) : undefined} size={AvatarSize.large} />
      <div>
        {generatePageTemplate(user).map(({ key, value }: TemplateType, index) => (
          // TODO Rename this component
          <ValuesGroup index={index} key={key} groupName={key} values={value} id={id} />
        ))}
      </div>
    </div>
  );
};

export default UserInfo;

type UserPagePropsType = {
  user: UserType;
};
