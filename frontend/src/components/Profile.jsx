import Footer from "./Footer";
import Form from "./Form/Form";
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  PHONE_REGEX,
} from "./Form/FormExpressions";
import Header from "./Header";

export default function Profile({ className }) {
  const handelProfileSubmit = (profileData) => {
    console.log(profileData);
  };
  return (
    <div className={`w-full ${className}`}>
      <Header className={`border`}></Header>
      <section className="py-2 px-4 mx-auto border-2 max-w-md">
        <h1 className="text-2xl font-semibold">Change Info</h1>
        <p className="mb-2 text-xs text-gray-400">
          changes will be reflected to every services
        </p>
        <Form
          className="max-w-sm p-2"
          fields={ProfileFields}
          buttonConfigs={{
            type: "submit",
            label: "Save",
            className: "mt-1 mb-2 py-2 px-4 bg-blue-500 rounded-lg text-white",
          }}
          handleSubmit={handelProfileSubmit}
        ></Form>
      </section>
      <Footer className={`border`}></Footer>
    </div>
  );
}

const ProfileFields = [
  {
    type: "text",
    label: "Name",
    name: "fullName",
    id: "fullName",
    defaultValue: "",
    className: "border-2 rounded-lg mt-1 mb-2 p-2",
    inputClassName: "w-full pl-2 outline-none",
    placeholder: "Name",
    required: true,
    validation: {
      required: {
        value: true,
        message: "Name is required",
      },
    },
  },
  {
    type: "textarea",
    label: "Bio",
    name: "bio",
    id: "bio",
    rows: 5,
    cols: 40,
    defaultValue: "",
    className: "border-2 rounded-lg mt-1 mb-2 p-2",
    inputClassName: "w-full pl-2 outline-none",
    placeholder: "Enter your bio",
    required: true,
    validation: {
      required: {
        value: false,
        message: "Bio is required",
      },
    },
  },
  {
    type: "tel",
    label: "Phone",
    name: "phone",
    id: "phone",
    rows: 5,
    cols: 40,
    defaultValue: "",
    className: "border-2 rounded-lg mt-1 mb-2 p-2",
    inputClassName: "w-full pl-2 outline-none",
    placeholder: "Enter phone number",
    required: true,
    validation: {
      required: {
        value: true,
        message: "Phone Number is required",
      },
      pattern: {
        value: PHONE_REGEX,
        message: "Please enter a valid phone number",
      },
    },
  },
  {
    type: "email",
    label: "Email",
    name: "email",
    id: "email",
    defaultValue: "",
    className: "border-2 rounded-lg mt-1 mb-2 p-2",
    inputClassName: "w-full pl-2 outline-none",
    placeholder: "Email",
    required: true,
    validation: {
      required: {
        value: true,
        message: "Email is required",
      },
      pattern: {
        value: EMAIL_REGEX,
        message: "Please enter a valid email",
      },
    },
  },
  {
    type: "password",
    label: "Password",
    name: "password",
    id: "password",
    defaultValue: "",
    className: "border-2 rounded-lg mt-1 mb-2 p-2",
    inputClassName: "w-full pl-2 outline-none",
    placeholder: "******",
    required: true,
    validation: {
      required: {
        value: true,
        message: "Password is required",
      },
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
      pattern: {
        value: PASSWORD_REGEX,
        message:
          "Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      },
    },
  },
];
