import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext } from "react";

interface AuthContextProps {
  currentUser: User | null;
  userLoggedIn: boolean;
  loading: boolean;
}

const AuthContext = React.createContext<AuthContextProps>({
  currentUser: null,
  userLoggedIn: false,
  loading: true,
});

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(value: User | null) {
    if (value) {
      setCurrentUser({ ...value });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  const value: AuthContextProps = {
    currentUser,
    userLoggedIn,
    loading,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
