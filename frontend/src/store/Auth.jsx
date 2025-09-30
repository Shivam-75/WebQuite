// context.js
import React, { createContext, useContext, useState, useEffect } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [profilename, setProfilename] = useState(null);

  const isLogin = !!token;

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    setProfilename(null);
    localStorage.removeItem("token");
  };

  const toastercontents = {
    position: "top-right",
    autoClose: 1000,
    theme: "dark",
  };

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASEURL}/userdata`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setProfilename(data?.data);
      } else {
        console.error("Failed to fetch profile:", data);
        logout(); // clear invalid session
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      logout();
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  return (
    <StoreContext.Provider
      value={{
        profilename,
        isLogin,
        toastercontents,
        logout,
        saveToken,
      }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
