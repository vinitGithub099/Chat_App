import _ from "underscore";
import Button from "../../Form/Button";

export default function SocialIconList({ iconsList, className }) {
  return (
    <div className={className}>
      {!_.isEmpty(iconsList) && iconsList.length
        ? iconsList.map(
            ({ handleClick, component: Component, className }, index) => (
              <Button
                key={index}
                type={"icon"}
                handleClick={handleClick}
                className={className}
              >
                {<Component></Component>}
              </Button>
            )
          )
        : null}
    </div>
  );
}
