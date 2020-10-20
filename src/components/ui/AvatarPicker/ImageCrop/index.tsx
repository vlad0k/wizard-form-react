import React, { FC, useCallback, useEffect, useState } from 'react';
import classNames from './index.module.css';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Button from '../../Button';
import { ButtonAppearance } from '../../../../types';
import PageHeader from '../../PageHeader';

const canvas = document.createElement('canvas');

const ImageCrop: FC<ImageCropPropsType> = ({ image, setField, onClose }) => {
  const [crop, setCrop] = useState<Crop>({ aspect: 1 / 1 });
  const [src, setSrc] = useState(URL.createObjectURL(image));
  const [img, setImg] = useState();
  useEffect(() => {
    setSrc(URL.createObjectURL(image));
    setField(image);
  }, [image, setField]);

  const cropChange = useCallback(
    (newCrop: Crop) => {
      const { x = 0, y = 0, height = 0, width = 0 } = newCrop;
      setCrop(newCrop);
      const createImage = () => {
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
      img && createImage();
    },
    [img, setField],
  );

  return (
    <div className={classNames.wrapper}>
      <div className={classNames.imageCrop}>
        <div className={classNames.header}>
          <PageHeader>Crop Image</PageHeader>
        </div>

        <ReactCrop
          src={src}
          crop={crop}
          onImageLoaded={(img) => setImg(img)}
          onChange={cropChange}
          className={classNames.crop}
        />

        <div className={classNames.button}>
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
