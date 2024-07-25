import cx from "classnames";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { activityComponents } from "./activityComponents";
import classes from "./index.module.css";

const ChatActivity = ({ className }) => {
  const activityLabel = useSelector((state) => state.ui.activityLabel);

  const RenderComponent = useMemo(
    () => activityComponents[activityLabel] || activityComponents.default,
    [activityLabel]
  );

  return (
    <div className={cx(classes.activityContainer, className)}>
      <RenderComponent />
    </div>
  );
};

export default ChatActivity;
