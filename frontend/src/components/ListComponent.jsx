export default function ListComponent({ list, className, subComponent }) {
  const SubComponent = subComponent;
  return (
    <div className={className}>
      {list && list.length
        ? list.map((fields, index) => {
            return <SubComponent key={index} {...fields}></SubComponent>;
          })
        : null}
    </div>
  );
}
