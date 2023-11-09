import { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../store/Features/ProfileSlice";
import Footer from "../Footer";
import Button from "../Form/Button";
import Form from "../Form/Form";
import Header from "../Header";
import { getProfileFields } from "./ProfileForm";

export default function EditProfile({ className }) {
  const navigate = useNavigate();
  const profileData = useSelector((state) => state.profile.profileData);
  const dispatch = useDispatch();

  const handelProfileSubmit = (profileData) => {
    dispatch(updateProfile(profileData));
  };

  const handleClick = () => navigate(-1);

  useEffect(() => {
    dispatch(updateProfile(profileData));
  }, []);

  return (
    <div className={`w-full bg-dark-3 text-light-1 ${className}`}>
      <Header className={`border`}></Header>
      <div className="mt-8 px-4 max-w-xl mx-auto flex items-baseline gap-4">
        <Button
          type="navigate"
          className="text-lg text-light-1 hover:text-light-2"
          handleClick={handleClick}
        >
          <IoIosArrowBack size={20}></IoIosArrowBack>
        </Button>
        <div className="">
          <h1 className="text-2xl font-semibold">Change Info</h1>
          <p className="my-2 text-xs text-gray-400">
            changes will be reflected to every services
          </p>
        </div>
      </div>
      <section className="max-w-xl my-4 p-4 sm:p-8 mx-auto sm:rounded-xl">
        <Form
          className="w-full"
          fields={getProfileFields(profileData)}
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
