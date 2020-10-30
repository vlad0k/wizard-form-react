import React, { FC } from 'react';

import preloaderSmall from '../../../assets/preloader-small.gif';
import preloader from '../../../assets/preloader.gif';

const Preloader: FC<PreloaderPropsType> = ({ size = 'default' }) => {
  const imageSrc = {
    default: preloader,
    small: preloaderSmall,
  }[size];

  return <img src={imageSrc} alt="loader" style={{ margin: 0 }} />;
};

type PreloaderPropsType = {
  size?: 'default' | 'small';
};

export default Preloader;
