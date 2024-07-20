import cx from "classnames";
import UserCard from "../../UserCard";
import classes from "./index.module.css";

const Option = (props) => {
  const label = props.data.label;
  return (
    <div
      {...props.innerProps}
      className={cx(
        classes.option,
        { [classes.select]: props.isSelected },
        { [classes.disabled]: props.isDisabled }
      )}
    >
      <UserCard user={label} avatarSize={"sm"} />
    </div>
  );
};

export default Option;
