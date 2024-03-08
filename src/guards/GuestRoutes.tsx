import { Outlet, Navigate } from "react-router-dom";
import jwtParse from "../utils/jwtParse";

const GuestRoutes = () => {
  const authToken = localStorage.getItem("accessToken");

  let userData;

  if (authToken) {
    userData = jwtParse(authToken);
  }

  return !authToken ? <Outlet /> : <Navigate to={`profile?user=${userData.username}`} />;
};

export default GuestRoutes;
