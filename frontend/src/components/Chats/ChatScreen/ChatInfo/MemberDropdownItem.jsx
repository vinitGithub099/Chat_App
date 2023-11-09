import Button from "../../../Form/Button";

export function MemberDropdownItem({ name, icon, handleClick }) {
  return (
    <Button
      type="button"
      className="w-full text-light-1 flex items-center gap-2 p-2 hover:bg-dark-1"
      onClick={handleClick}
    >
      <span>{icon}</span>
      <p>{name}</p>
    </Button>
  );
}
