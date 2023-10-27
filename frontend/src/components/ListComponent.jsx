export default function ListComponent({ list, className, subComponent }) {
  const SubComponent = subComponent;
  return (
    <div className={className}>
      {list.map((item, index) => {
        return <SubComponent key={index} {...item}></SubComponent>;
      })}
    </div>
  );
}
