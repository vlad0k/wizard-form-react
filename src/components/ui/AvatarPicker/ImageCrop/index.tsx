import React, { FC, useEffect, useState } from 'react';
import classNames from './index.module.css';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Button from '../../Button';
import { ButtonAppearance } from '../../../../types';
import PageHeader from '../../PageHeader';
import { throttle } from 'lodash';

const ImageCrop: FC<ImageCropPropsType> = ({ image, setField, onClose }) => {
  const [crop, setCrop] = useState<Crop>({ aspect: 1 / 1 });
  const [src, setSrc] = useState(URL.createObjectURL(image));
  const [img, setImg] = useState();
  useEffect(() => {
    setSrc(URL.createObjectURL(image));
    setField(image);
  }, [image]);

  const cropChange = (newCrop: Crop) => {
    const { x = 0, y = 0, height = 0, width = 0 } = newCrop;
    setCrop(newCrop);
    const createImage = () => {
      const canvas = document.createElement('canvas');
      const scaleX = img.naturalWidth / img.width;
      const scaleY = img.naturalHeight / img.height;
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx &&
        ctx.drawImage(
          img,
          x * scaleX,
          y * scaleY,
          width * scaleX,
          height * scaleY,
          0,
          0,
          width,
          height,
        );

      canvas.toBlob((blob) => {
        if (blob) {
          const avatar = new File([blob], 'avatar.jpeg');
          setField(avatar);
        }
      });
    };
    img && throttle(createImage, 1000)();
  };
  return (
    <div className={classNames.wrapper}>
      <div className={classNames.imageCrop}>
        <PageHeader>Crop Image</PageHeader>

        <div className={classNames.paddingWrapper}>
          <ReactCrop
            src={src}
            crop={crop}
            onImageLoaded={(img) => setImg(img)}
            onChange={cropChange}
          />
        </div>
        <div className={classNames.paddingWrapper}>
          <Button onClick={onClose} appearance={ButtonAppearance.finish}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

type ImageCropPropsType = {
  image: File;
  setField: (file: File) => void;
  onClose: () => void;
};

export default ImageCrop;
