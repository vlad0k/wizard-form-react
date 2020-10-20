import React, { FC, ReactNode } from 'react';
import classNames from './index.module.css';
import { useDropzone } from 'react-dropzone';

const DropZone: FC<DropZonePropsType> = ({ name, handleChange, children }) => {
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
  handleChange: (file: File) => void;
  children: ReactNode;
  name: string;
};

export default DropZone;
