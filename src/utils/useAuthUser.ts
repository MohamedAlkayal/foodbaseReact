import { useEffect } from "react";
import { MyUser } from "../types/MyUser";
import jwtParse from "./jwtParse";

function useAuthenticatedUser(setUserFunction: (user: MyUser | null) => void): void {
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const userData = jwtParse(token);
      setUserFunction(userData);
    } else {
      setUserFunction(null);
    }
  }, [setUserFunction]);
}

export default useAuthenticatedUser;
