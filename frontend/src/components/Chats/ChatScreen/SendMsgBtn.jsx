
import Form from "../../Form/Form";

export default function SendMsgBtn() {
  return (
    <div className="my-4 mx-8">
      <Form
        className="w-full flex flex-row gap-2"
        fields={formFields}
        buttonConfigs={{
          type: "submit",
          label: "Send",
          className: "py-2 px-4 bg-blue-500 rounded-lg text-white bg-dark",
        }}
        handleSubmit={(e) => console.log(e)}
      ></Form>
    </div>
  );
}

const formFields = [
  {
    type: "text",
    label: "",
    name: "chatBox",
    id: "chat",
    defaultValue: "",
    containerClassName: "",
    className: "rounded-md bg-light-3",
    inputClassName:
      "p-2 w-full outline-none rounded-md bg-light-3 text-light-1",
    placeholder: "Send Message",
  },
];
