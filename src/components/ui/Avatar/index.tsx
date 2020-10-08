import React from 'react';
import classNames from './index.module.css';
import cn from 'classnames';
import noPhotoIcon from '../../../assets/icons/empty-avatar.svg';

const Avatar = ({ image, size = 'default' }: AvatarProp) => {
  return (
    <div
      className={cn(classNames.avatar, classNames[size], {
        [classNames.noImageLarge]: !image && size !== 'small',
        [classNames.noImageSmall]: !image && size === 'small',
      })}
    >
      <img src={image ? image : noPhotoIcon} alt="avatar" />
    </div>
  );
};

export default Avatar;

type AvatarProp = {
  image?: string;
  size?: 'small' | 'default' | 'large';
};
