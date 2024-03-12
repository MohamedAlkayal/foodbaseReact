import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { MyUser } from "../types/MyUser";
import { ax } from "../../axios.config";

interface UserContextType {
  user: MyUser | null;
  isFetchingUser: boolean;
  updateUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<MyUser | null>(null);
  const [isFetchingUser, setIsFetchingUser] = useState<boolean>(false);

  useEffect(() => {
    fetchUserData().then((userProfile) => {
      setUser(userProfile);
    });
  }, []);

  async function fetchUserData() {
    if (localStorage.getItem("accessToken")) {
      try {
        setIsFetchingUser(true);
        const userProfile = await ax.get("/user/");
        setIsFetchingUser(false);
        return userProfile.data.data;
      } catch (err) {
        setIsFetchingUser(false);
        console.log(err);
      }
    }
  }

  async function updateUser() {
    const userProfile = await fetchUserData();
    setUser(userProfile);
  }

  return <UserContext.Provider value={{ user, isFetchingUser, updateUser }}>{children}</UserContext.Provider>;
}
