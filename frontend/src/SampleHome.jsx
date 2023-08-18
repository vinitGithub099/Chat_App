import { Link } from "react-router-dom";

export default function SampleHome() {
  return (
    <div>
      <div>
        <Link to="/login">login</Link>
      </div>
      <div>
        <Link to="/register">register</Link>
      </div>
      <div>
        <Link to="/profile">profile</Link>
      </div>
    </div>
  );
}
