import { Outlet, Navigate } from "react-router-dom";

const GuestRoutes = () => {
  const authToken = localStorage.getItem("accessToken");
  return !authToken ? <Outlet /> : <Navigate to={`/profile`} />;
};

export default GuestRoutes;
