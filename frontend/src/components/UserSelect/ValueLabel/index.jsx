import UserCard from "../../UserCard";
import classes from "../index.module.css";

const ValueLabel = ({ data }) => {
  return (
    <UserCard
      user={data.label}
      avatarSize={"xs"}
      className={classes.valueLabel}
    />
  );
};

export default ValueLabel;
