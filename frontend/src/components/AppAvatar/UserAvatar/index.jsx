import { Avatar } from "@material-tailwind/react";
import { useMemo } from "react";
import { stringToColor } from "../../../helpers/helpers";

const UserAvatar = ({ user, className }) => {
  const randomColor = useMemo(() => stringToColor(user._id), [user._id]);

  const renderInitialAvatar = (initials) => (
    <div className={className} style={{ backgroundColor: randomColor }}>
      <span>{initials}</span>
    </div>
  );

  if (user?.imageSrc) {
    return <Avatar src={user.imageSrc} className={className} />;
  } else {
    const initials = user.name.charAt(0).toUpperCase();
    return renderInitialAvatar(initials);
  }
};

export default UserAvatar;
