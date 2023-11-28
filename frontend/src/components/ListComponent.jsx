export default function ListComponent({
  list,
  className,
  subComponent: SubComponent,
  children,
  emptyMessage,
  ...rest
}) {
  return (
    <div className={className}>
      {list && list.length
        ? list.map((fields, index) => {
            return (
              <SubComponent
                key={fields?._id ? fields._id : index}
                {...fields}
                {...rest}
                index={index}
              ></SubComponent>
            );
          })
        : emptyMessage
        ? emptyMessage
        : null}
      {children}
    </div>
  );
}
