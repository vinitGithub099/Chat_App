import Button from "../Form/Button";
import ListComponent from "../ListComponent";

export default function SocialIconList({ iconsList, className }) {
  return (
    <ListComponent
      list={iconsList}
      className={className}
      subComponent={SubComponent}
    ></ListComponent>
  );
}

function SubComponent({ handleClick, component: Component, className }) {
  return (
    <Button type={"icon"} handleClick={handleClick} className={className}>
      {<Component></Component>}
    </Button>
  );
}
