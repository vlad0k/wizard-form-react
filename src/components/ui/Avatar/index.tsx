import cn from 'classnames';
import React from 'react';

import noPhotoIcon from '../../../assets/icons/empty-avatar.svg';
import { AvatarSize } from '../../../types';
import classNames from './index.module.css';

const Avatar = ({ imageFile, imageSrc, size = AvatarSize.default }: AvatarProp) => {
  const image = imageFile ? URL.createObjectURL(imageFile) : imageSrc;
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
  imageFile?: File | null;
  imageSrc?: string;
  size?: AvatarSize;
};
