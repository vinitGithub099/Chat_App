import Button from "../../../Form/Button";

export function MemberDropdownItem({ name, icon, handleClick, disabled }) {
  return (
    <Button
      type="button"
      className={`w-full text-light-1 flex items-center gap-2 p-2 ${
        disabled ? `hover:cursor-not-allowed` : `hover:bg-dark-1 `
      }`}
      handleClick={handleClick}
      disabled={disabled}
    >
      <span>{icon}</span>
      <span>{name}</span>
    </Button>
  );
}
