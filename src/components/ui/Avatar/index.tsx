import React from "react";
import classNames from "./index.module.css";
import noPhotoIcon from "../../../assets/icons/empty avatar.svg";

type AvatarProp = {
  image?: string;
};

const Avatar = ({ image }: AvatarProp) => {
  return (
    <div className={classNames.avatar}>
      <img src={image ? image : noPhotoIcon} alt={"avatar"} />
    </div>
  );
};

export default Avatar;
