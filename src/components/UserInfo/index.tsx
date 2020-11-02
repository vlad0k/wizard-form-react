import React, { FC } from 'react';

import { SKILLS_SELECT_OPTIONS } from '../../formOptions';
import { AvatarSize, ButtonAppearance, UserType } from '../../types';
import Avatar from '../ui/Avatar';
import classNames from './index.module.css';
import ValuesGroup from './ValuesGroup';
import ValuesList from './ValuesList';

const UserInfo: FC<UserPagePropsType> = ({ user }) => {
  if (Object.keys(user).length === 0 || !('avatar' in user)) {
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

  const skillsList = skills.map((skill) => {
    const skillLabel = SKILLS_SELECT_OPTIONS.find(({ value }) => skill === value);
    return skillLabel ? skillLabel.label : '';
  });

  return (
    <div className={classNames.userPage}>
      <Avatar imageFile={avatar} size={AvatarSize.large} />

      <div>
        <ValuesGroup id={id} name={'Account'} linkHash={'account'}>
          <div className={classNames.groupElements}>
            <span>Username</span>
            <span>{username}</span>
          </div>
          <div className={classNames.groupElements}>
            <span>Password</span>
            <span>********</span>
          </div>
        </ValuesGroup>

        <ValuesGroup id={id} name={'Personal'} linkHash={'profile'}>
          <div className={classNames.groupElements}>
            <span>First Name</span>
            <span>{firstname}</span>
          </div>
          <div className={classNames.groupElements}>
            <span>Last Name</span>
            <span>{lastname}</span>
          </div>
          <div className={classNames.groupElements}>
            <span>Birth Date</span>
            <span>{birthdate && birthdate.toLocaleDateString()}</span>
          </div>
          <div className={classNames.groupElements}>
            <span>Email</span>
            <span>{email}</span>
          </div>
          <div className={classNames.groupElements}>
            <span>Address</span>
            <span>{address}</span>
          </div>
        </ValuesGroup>

        <ValuesGroup id={id} name={'Contacts'} linkHash={'contacts'}>
          <div className={classNames.groupElements}>
            <span>Company</span>
            <span>{company}</span>
          </div>
          <div className={classNames.groupElements}>
            <span>Fax</span>
            <span>{fax}</span>
          </div>
          <div className={classNames.groupElements}>
            <span>Facebook Link</span>
            <span>{facebook}</span>
          </div>
          <div className={classNames.groupElements}>
            <span>Phone</span>
            <span>
              <ValuesList list={phoneNumbers} />
            </span>
          </div>
        </ValuesGroup>

        <ValuesGroup id={id} name={'Capabilities'} linkHash={'capabilities'}>
          <div className={classNames.groupElements}>
            <span>Skills</span>
            <span>
              <ValuesList list={skillsList} />
            </span>
          </div>
          <div className={classNames.groupElements}>
            <span>Hobbies</span>
            <span>
              <ValuesList list={hobbies} />
            </span>
          </div>
        </ValuesGroup>
      </div>
    </div>
  );
};
type UserPagePropsType = {
  user: UserType | {};
};
export default UserInfo;
