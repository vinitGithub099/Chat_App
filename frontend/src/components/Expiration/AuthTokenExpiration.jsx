import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../Form/Button";

export default function AuthTokenExpiration() {
  const navigate = useNavigate();
  const { tokenExpired } = useSelector((state) => state.auth);
  const handleLoginNavigate = () => navigate("/login");
  useEffect(() => {
    if (!tokenExpired) navigate(-1);
  });
  return (
    <div className="w-full h-screen bg-dark-3 px-4 sm:px-16 py-2">
      <section className="bg-dark-2 mx-auto w-full mt-20 max-w-3xl h-60 rounded-lg shadow-lg shadow-light-3 flex flex-col justify-between items-center py-2">
        <div className="w-full flex flex-col justify-between items-center">
          <h3 className="py-4 text-2xl text-light-2 font-bold">
            Login Expired!
          </h3>
          <Button
            type="navigate"
            className="px-6 py-2 border border-light-3 bg-light-3 rounded-md text-light-1 text-lg hover:border-light-3 hover:bg-dark-1 transition-all duration-300"
            handleClick={handleLoginNavigate}
          >
            Login
          </Button>
        </div>
        <p className="text-light-1 py-4 font-medium text-sm">
          Kindly Login again to continue further.
        </p>
      </section>
    </div>
  );
}
