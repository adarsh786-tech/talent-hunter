import * as React from "react";
import Avatar from "@mui/material/Avatar";

const ImageAvatar = ({ imgSrc }: { imgSrc: string | null | undefined }) => {
  return <Avatar alt="Remy Sharp" src={imgSrc!} />;
};
export default ImageAvatar;
