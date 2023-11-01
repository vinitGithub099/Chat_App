import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "underscore";
import Footer from "../Footer";
import Button from "../Form/Button";
import Header from "../Header";

export default function Profile({ className }) {
  return (
    <div className={`w-full px-4 ${className}`}>
      <Header className="border my-4"></Header>
      <h1 className="w-full p-2 text-3xl font-semibold text-center">
        Personal Info
      </h1>
      <p className="text-center text-sm text-gray-500 mb-4">
        Basic info like your name and info
      </p>
      <section className="max-w-3xl my-8 mx-auto border-2 rounded-lg">
        <ProfileInfoInfoHeader></ProfileInfoInfoHeader>
        <ProfileInfoSection></ProfileInfoSection>
      </section>
      <Footer className={`border`}></Footer>
    </div>
  );
}

function ProfileInfoInfoHeader() {
  const navigate = useNavigate();
  const handleClick = () => navigate("/profile/edit");
  return (
    <div className="w-full p-4 flex flex-row justify-between border-b-2">
      <div className="">
        <h2 className="text-2xl">Profile</h2>
        <h4 className="text-xs">Some info may be visible to others</h4>
      </div>
      <Button
        type="navigate"
        label="Edit"
        className="border-2 rounded-lg py-1 px-5 text-gray-500"
        handleClick={handleClick}
      ></Button>
    </div>
  );
}

function ProfileInfoSection() {
  const profileData = useSelector((state) => state.profile.profileData);

  return !_.isEmpty(profileData)
    ? Object.entries(profileData).map(([key, value], index) => {
        return (
          <div
            key={index}
            className="w-full py-4 px-2 sm:p-4 grid grid-cols-3 border-b-2"
          >
            <h4 className="text-md text-gray-400 col-span-1">{key}</h4>
            <p className="col-span-2">
              {!_.isEmpty(value)
                ? value.length > 50
                  ? value.substring(0, 200) + "..."
                  : value
                : ""}
            </p>
          </div>
        );
      })
    : null;
}
