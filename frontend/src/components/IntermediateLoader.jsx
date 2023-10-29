import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function IntermediateLoader({ className }) {
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);
  useEffect(() => {
    setTimeout(() => {
      navigate(
        location.state?.to
          ? location.state.to
          : location.state?.from
          ? location.state.from
          : "/",
        { state: { from: location.state?.from ? location.state.from : "/" } }
      );
    }, 3000);
  }, []);

  return (
    <div
      className={`pt-20 w-full h-screen bg-dark-3 flex flex-col items-center ${className}`}
    >
      <div className="w-20 h-20 my-10 rounded-full border-2 border-t-dark-2 animate-spin"></div>
      <div className="text-light-1 text-lg font-semibold">
        {location.state?.message ? (
          location.state.message
        ) : (
          <p className="text-warning">No Message received!</p>
        )}
      </div>
    </div>
  );
}
