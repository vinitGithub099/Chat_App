export default function ListComponent({
  list,
  className,
  subComponent,
  ...rest
}) {
  const SubComponent = subComponent;
  return (
    <div className={className}>
      {list && list.length
        ? list.map((fields, index) => {
            return (
              <SubComponent
                key={fields._id ? fields._id : index}
                {...fields}
                {...rest}
              ></SubComponent>
            );
          })
        : null}
    </div>
  );
}
