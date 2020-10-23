import React, { FC, ReactNode } from 'react';
import { useDropzone } from 'react-dropzone';

import classNames from './index.module.css';

const DropZone: FC<DropZonePropsType> = ({ handleChange, children }) => {
  const onDrop = (acceptedFiles: File[]) => {
    handleChange(acceptedFiles[0]);
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()} className={classNames.dropZone}>
      {children}
      <input {...getInputProps()} />
      <span className={classNames.dropMessage}>drop avatar image here</span>
    </div>
  );
};

type DropZonePropsType = {
  handleChange: (photo: File) => void;
  children: ReactNode;
};

export default DropZone;
