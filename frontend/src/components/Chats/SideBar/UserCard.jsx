import { getShortenedString } from "../../Utils/utils";
import UserAvatar from "../UserAvatar";

export default function UserCard({ className, imgSrc, name, imgConfig }) {
  console.log(name);
  return (
    <div className={`flex flex-row items-center ${className}`}>
      <UserAvatar
        className=""
        imgSrc={imgSrc}
        config={imgConfig ? imgConfig : "s"}
      ></UserAvatar>
      <p className="text-md font-semibold px-4">{getShortenedString(name)}</p>
    </div>
  );
}
