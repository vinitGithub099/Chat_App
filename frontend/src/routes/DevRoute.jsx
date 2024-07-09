import { Outlet } from "react-router-dom";

const DevRoutes = () => {
  return import.meta.env.PROD ? null : <Outlet></Outlet>;
};

export default DevRoutes;
