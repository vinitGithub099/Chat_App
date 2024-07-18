import UserCard from "../../UserCard";
import classes from "../index.module.css";

const MultiValueLabel = ({ data }) => {
  return (
    <UserCard
      user={data.label}
      avatarSize={"xs"}
      className={classes.multiValueLabel}
    />
  );
};

export default MultiValueLabel;
