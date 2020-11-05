import React, { FC } from 'react';

import { SKILLS_SELECT_OPTIONS } from '../../formOptions';
import { AvatarSize, UserType } from '../../types';
import Avatar from '../ui/Avatar';
import classNames from './index.module.css';
import InfoItem from './InfoItem';
import InfoSection from './InfoSection';

const getSkillsLabels = (skills: string[] = []) => {
  return skills.map((skill) => {
    const { label } = SKILLS_SELECT_OPTIONS.find(({ value }) => skill === value) || { label: '' };
    return label;
  });
};

const UserInfo: FC<UserPagePropsType> = ({ user }) => {
  if (!user) {
    return <div>No such user</div>;
  }

  const {
    avatar,
    id,
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
  } = user;

  const skillsList = getSkillsLabels(skills);

  return (
    <div className={classNames.userPage}>
      <Avatar imageFile={avatar} size={AvatarSize.large} />

      <div>
        <InfoSection id={id} name={'Account'} linkHash={'account'}>
          <InfoItem name="Username" value={username} />
          <InfoItem name="Password" value="********" />
        </InfoSection>

        <InfoSection id={id} name={'Personal'} linkHash={'profile'}>
          <InfoItem name="First Name" value={firstname} />
          <InfoItem name="Last Name" value={lastname} />
          <InfoItem name="Birth Date" value={birthdate && birthdate.toLocaleDateString()} />
          <InfoItem name="Email" value={email} />
          <InfoItem name="Address" value={address} />
        </InfoSection>

        <InfoSection id={id} name={'Contacts'} linkHash={'contacts'}>
          <InfoItem name="Company" value={company} />
          <InfoItem name="Fax" value={fax} />
          <InfoItem name="Facebook Link" value={facebook} />
          <InfoItem name="Phone" value={phoneNumbers} />
        </InfoSection>

        <InfoSection id={id} name={'Capabilities'} linkHash={'capabilities'}>
          <InfoItem name="Skills" value={skillsList} />
          <InfoItem name="Hobbies" value={hobbies} />
        </InfoSection>
      </div>
    </div>
  );
};
type UserPagePropsType = {
  user: UserType;
};
export default UserInfo;
