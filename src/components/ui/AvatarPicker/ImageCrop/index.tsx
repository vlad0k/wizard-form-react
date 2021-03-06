import Cropper from 'cropperjs';
import React, { createRef, FC, useEffect, useState } from 'react';

import { ButtonAppearance } from '../../../../types';
import getFileExtentionFromMime from '../../../../utils/getFileExtentionFromMime';
import Button from '../../Button';
import PageHeader from '../../PageHeader';
import classNames from './index.module.css';

const SQUARE_CROPPER_SIZE = 150;

const MIN_CROPPER_WIDTH = SQUARE_CROPPER_SIZE;
const MIN_CROPPER_HEIGHT = SQUARE_CROPPER_SIZE;

const ImageCrop: FC<ImageCropPropsType> = ({ image, setField = () => {}, close = () => {} }) => {
  const [resultCanvas, setResultCanvas] = useState<HTMLCanvasElement>();
  const imageRef = createRef<HTMLImageElement>();

  useEffect(() => {
    if (!imageRef.current) {
      return;
    }
    const cropper = new Cropper(imageRef.current, {
      aspectRatio: 1,
      crop: () => {
        setResultCanvas(cropper.getCroppedCanvas());
      },
      cropmove: (event) => {
        const data = cropper.getData();

        if (data.width < MIN_CROPPER_WIDTH) {
          event.preventDefault();
          data.width = MIN_CROPPER_WIDTH;
          cropper.setData(data);
        }

        if (data.height < MIN_CROPPER_HEIGHT) {
          event.preventDefault();
          data.height = MIN_CROPPER_HEIGHT;
          cropper.setData(data);
        }
      },
    });
  }, [imageRef]);

  const doneButtonHandler = () => {
    if (!resultCanvas) {
      setField(image);
    } else {
      resultCanvas.toBlob((blob) => {
        if (blob) {
          const extention = getFileExtentionFromMime(blob.type);
          setField(new File([blob], 'avatar' + extention, { type: blob.type }));
        }
      });
    }
    close();
  };

  return (
    <div className={classNames.wrapper}>
      <div className={classNames.cropContainer}>
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
  close: () => void;
};

export default ImageCrop;
