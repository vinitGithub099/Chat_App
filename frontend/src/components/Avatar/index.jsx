import { AVATAR_SIZE } from "../../constants/avatar";

const Avatar = ({
  src,
  size = AVATAR_SIZE.MEDIUM,
  alt = "Avatar",
  ...props
}) => {
  const sizes = {
    [AVATAR_SIZE.SMALL]: { width: 50, height: 50 },
    [AVATAR_SIZE.MEDIUM]: { width: 100, height: 100 },
    [AVATAR_SIZE.LARGE]: { width: 150, height: 150 },
  };

  // default to medium size if size prop is invalid
  const { width, height } = sizes[size] || sizes[AVATAR_SIZE.MEDIUM];

  return <img src={src} width={width} height={height} alt={alt} {...props} />;
};

export default Avatar;
