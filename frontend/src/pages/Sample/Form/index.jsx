import { MdEmail, MdPassword } from "react-icons/md";
import Button from "../../../components/Button";
import Form from "../../../components/Form";
import EmailField from "../../../components/Input/Email";
import TextField from "../../../components/Input/Text";

const DummyForm = () => {
  return (
    <div className="mx-auto w-full min-h-screen">
      <h3 className="text-light-2 text-3xl font-bold text-center py-4">
        Demo Form
      </h3>
      <Form
        {...{
          className:
            "p-4 mx-auto max-w-sm border border-primary bg-primary rounded-md flex flex-col gap-4",
          handleSubmit: (e) => {
            console.log(e);
          },
        }}
      >
        <EmailField
          {...{
            wrapperClassName: "",
            className: "p-2 flex border-b-2 border-highlight",
            errorClassName: "py-1 text-red-300 text-xs font-light",
            labelClassName: "pr-2 text-highlight",
            inpClassName: "px-2 outline-none text-white bg-transparent",
            label: <MdEmail size={30} />,
            name: "email",
            placeholder: "abc@gmail.com",
          }}
        />
        <TextField
          {...{
            wrapperClassName: "",
            className: "p-2 flex border-b-2 border-highlight",
            errorClassName: "py-1 text-red-300 text-xs font-light",
            labelClassName: "pr-2 text-highlight",
            inpClassName: "px-2 outline-none text-white bg-transparent",
            label: <MdPassword size={30} />,
            name: "text",
            placeholder: "abc xyz",
          }}
        />
        <Button type="submit" className="my-2 p-2 rounded-md bg-highlight">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default DummyForm;
