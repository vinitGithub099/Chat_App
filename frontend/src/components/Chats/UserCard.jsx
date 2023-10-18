import UserAvatar from "./UserAvatar";

export default function UserCard({ className, imgSrc, name }) {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <UserAvatar className="pr-4" imgSrc={imgSrc} config="s"></UserAvatar>
      <p className="text-md font-semibold">{name}</p>
    </div>
  );
}
