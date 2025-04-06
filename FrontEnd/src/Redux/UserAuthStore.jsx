import React, { useState } from "react";
import { axiosInstance } from "../lib/axios";

export const userAuthContext = React.createContext();

const UserAuthStore = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isCheckingAuth, setisCheckingAuth] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      setAuthUser(res.data);
    } catch (error) {
      setAuthUser(null);
      console.log("checkAuth error", error);
    } finally {
      setisCheckingAuth(false);
    }
  };

  return (
    <userAuthContext.Provider value={{ authUser, checkAuth, isCheckingAuth }}>
      {children}
    </userAuthContext.Provider>
  );
};

export default UserAuthStore;
