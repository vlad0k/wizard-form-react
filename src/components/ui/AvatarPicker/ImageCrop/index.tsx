import React, { createRef, FC, useEffect, useState } from 'react';
import classNames from './index.module.css';
import Cropper from 'cropperjs';
import PageHeader from '../../PageHeader';
import Button from '../../Button';
import { ButtonAppearance } from '../../../../types';

const ImageCrop: FC<ImageCropPropsType> = ({ image, setField, onClose }) => {
  const [result, setResult] = useState<File>(image);
  const imageRef = createRef<HTMLImageElement>();

  useEffect(() => {
    if (!imageRef.current) {
      return;
    }
    const cropper = new Cropper(imageRef.current, {
      aspectRatio: 1,
      crop: () => {
        cropper.getCroppedCanvas().toBlob((blob) => {
          if (blob) {
            const avatar = new File([blob], 'avatar.png');
            setResult(avatar);
          }
        });
      },
    });
  }, [imageRef]);

  const doneButtonHandler = () => {
    setField(result);
    onClose();
  };

  return (
    <div className={classNames.wrapper}>
      <div className={classNames.imageCrop}>
        <div className={classNames.header}>
          <PageHeader>Crop Image</PageHeader>
        </div>

        <div className={classNames.crop}>
          <img src={URL.createObjectURL(image)} ref={imageRef} alt="Avatar" />
        </div>
        <div className={classNames.button}>
          <Button onClick={doneButtonHandler} appearance={ButtonAppearance.finish}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

type ImageCropPropsType = {
  image: File;
  setField: (image: File) => void;
  onClose: () => void;
};

export default ImageCrop;
