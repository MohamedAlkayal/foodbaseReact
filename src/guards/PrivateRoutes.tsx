import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";

const PrivateRoutes = () => {
  const authToken = localStorage.getItem("accessToken");

  return authToken ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default PrivateRoutes;
