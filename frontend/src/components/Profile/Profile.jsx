import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "underscore";
import Button from "../Form/Button";

export default function Profile({ className }) {
  return (
    <div className={`w-full h-screen p-4 bg-dark-3 ${className}`}>
      <h1 className="p-2 mt-20 text-light-1 text-3xl text-center">
        This page is under construction!
      </h1>
    </div>
  );
}

{
  /* <div className={`w-full h-screen px-4 bg-dark-3 ${className}`}>
  <h1 className="w-full pt-8 pb-3 text-3xl font-semibold text-center text-light-1">
    Personal Info
  </h1>
  <section className="max-w-3xl my-8 mx-auto border border-light-2 rounded-lg text-light-1">
    <ProfileInfoInfoHeader></ProfileInfoInfoHeader>
    <ProfileInfoSection></ProfileInfoSection>
  </section>
</div>; */
}
function ProfileInfoInfoHeader() {
  const navigate = useNavigate();
  const handleClick = () => navigate("/profile/edit");
  return (
    <div className="w-full p-4 flex flex-row justify-between border-b-2">
      <div className="">
        <h2 className="text-2xl">Profile</h2>
        <h4 className="text-xs text-light-2">
          Some info may be visible to others
        </h4>
      </div>
      <Button
        type="navigate"
        label="Edit"
        className="border-2 border-light-2 rounded-lg py-1 px-5 text-light-1"
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
            className="w-full py-4 px-2 sm:p-4 grid grid-cols-3 border border-light-2"
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
