import { getShortenedString } from "../../Utils/utils";
import UserAvatar from "../UserAvatar";

export default function UserCard({
  className,
  imgSrc,
  name,
  imgConfig,
  handleClick,
}) {
  return (
    <div
      className={`flex flex-row items-center ${className}`}
      onClick={handleClick}
    >
      <UserAvatar
        className=""
        imgSrc={imgSrc}
        config={imgConfig ? imgConfig : "s"}
      ></UserAvatar>
      <p className="text-md font-semibold px-4">{getShortenedString(name)}</p>
    </div>
  );
}
