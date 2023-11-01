import { useNavigate } from "react-router-dom";

export default function FormNavLink({ className, text, label, path }) {
  const navigate = useNavigate();
  const handleClick = () => navigate(path);
  return (
    <div className={`text-center font-light text-sm my-2 ${className}`}>
      {text}
      <span
        className="text-blue-500 font-semibold hover:cursor-pointer"
        onClick={handleClick}
      >
        {label}
      </span>
    </div>
  );
}
