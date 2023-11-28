import Button from "../../../Form/Button";

export function MemberDropdownItem({ name, icon, handleClick, disabled }) {
  return (
    <Button
      type="button"
      className={`w-full text-light-1 flex items-center gap-2 p-2 hover:bg-dark-1 ${
        disabled ? `hover:cursor-not-allowed` : ``
      }`}
      onClick={handleClick}
      disabled={disabled}
    >
      <span>{icon}</span>
      <span>{name}</span>
    </Button>
  );
}
