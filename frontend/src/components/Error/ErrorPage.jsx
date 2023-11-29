import { useNavigate } from "react-router-dom";
import Button from "../Form/Button";

export default function ErrorPage() {
  const navigate = useNavigate();
  const handleClick = () => navigate("/");
  return (
    <div className="w-full p-2 h-screen bg-dark-3">
      <div className="mx-auto w-full md:px-20 mt-20 flex flex-col sm:flex-row text-center">
        <div className="p-4 sm:p-8 ">
          <h1 className="mb-8 sm:mb-12 px-4 text-5xl sm:text-9xl font-bold text-light-3">
            Oops!
          </h1>
          <p className="px-4 text-lg font-semibold text-light-1">
            The page you requested for does not exist!
          </p>
          <Button
            className="m-4 px-8 py-4 bg-light-3 text-light-1 font-semibold text-xl rounded-md hover:bg-light-1 hover:text-light-3"
            type="submit"
            label="Home"
            handleClick={handleClick}
          ></Button>
        </div>
        <div className="py-4 flex-1 sm:p-8">
          <div className="text-5xl sm:text-9xl font-bold text-light-1">404</div>
          <h3 className="px-4 py-2 text-2xl font-semibold text-light-2">
            Page not found
          </h3>
        </div>
      </div>
    </div>
  );
}
