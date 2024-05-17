import Input from "..";

const TextField = (props) => {
  return (
    <Input
      {...{
        ...props,
        type: "text",
        validation: {
          required: { value: true, message: "Please fill the above field!" },
        },
      }}
    />
  );
};

export default TextField;
