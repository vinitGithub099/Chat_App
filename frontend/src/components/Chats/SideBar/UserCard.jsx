import UserAvatar from "../UserAvatar";

export default function UserCard({ className, imgSrc, name, imgConfig }) {
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

const getShortenedString = (str) => {
  let modifiedStr = str;
  if (str.length > 20) {
    modifiedStr = str.substring(0, 20) + "...";
  }
  return modifiedStr;
};
