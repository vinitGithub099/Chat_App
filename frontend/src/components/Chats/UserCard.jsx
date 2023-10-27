import UserAvatar from "./UserAvatar";

export default function UserCard({ className, imgSrc, name }) {
  return (
    <div className={`flex flex-row items-center ${className}`}>
      <UserAvatar className="" imgSrc={imgSrc} config="s"></UserAvatar>
      <p className="text-md font-semibold px-4">{name}</p>
    </div>
  );
}
