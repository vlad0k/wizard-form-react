import React from 'react';
import classNames from './index.module.css';
import cn from 'classnames';
import noPhotoIcon from '../../../assets/icons/empty-avatar.svg';

const Avatar = ({ image, small }: AvatarProp) => {
  return (
    <div
      className={cn(classNames.avatar, {
        [classNames.small]: small,
        [classNames.default]: !small,
      })}
    >
      <img src={image ? image : noPhotoIcon} alt="avatar" />
    </div>
  );
};

export default Avatar;

type AvatarProp = {
  image?: string;
  small?: boolean;
};
